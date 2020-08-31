import React from "react";
import { Scene, Entity } from "aframe-react";
import axios from "axios";
//import qs from "qs";
import "aframe";
import "aframe-look-at-component";

import FormInput from "../../components/form-input/form-input.component";
import FormSelect from "../../components/form-select/form-select.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import FileInput from "../../components/file-input/file-input.component";
import Icon from "../../components/icon/icon.component";
import DialogMessage from "../../components/dialog-message/dialog-message.component";
import LoadingScreen from "../../components/loading-screen/loading-screen.component";

import "./tour-editor.styles.scss";

//TODO: Optimize image load.

class TourEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0, //estate id reference.
      file: null,
      fileString: "",
      title: "",
      selectedItem: null,
      tourList: [],
      link: "",
      pointElement: null,
      editMode: false,
      hoveredLinkElement: null,
      //Messages
      dialogIsOpen: false,
      dialogMessage: "",
      dialogType: "",
      loadingVisible: false,
      loadingProgress: 0,
    };
  }

  componentDidMount = () => {
    const { match } = this.props;

    if (isNaN(match.params.id) || match.params.id === undefined) {
      alert("Inmueble no válido.");
      this.props.history.push("/admin/estate");
      return;
    }

    axios
      .get(`http://localhost:4000/api/tour?id=${match.params.id}`)
      .then((success) => {
        console.log(success.data);
        //[...tourList, { id, title, file, fileString, destinationLinks: [] }]
        let { tourScenes } = success.data;

        this.setState({
          id: match.params.id,
          tourList: tourScenes.map((item) => ({
            ...item,
            file: null,
          })),
        });
      })
      .catch((err) => {
        alert("Inmueble no válido.");
        this.props.history.push("/admin/estate");
      });
  };

  /*Functions*/

  showLoadingScreen = () => {
    this.setState({ loadingVisible: true, progress: 0 });
  };

  hideLoadingScreen = () => {
    this.setState({ loadingVisible: false, progress: 0 });
  };

  getDestinationLinks = () => this.state.tourList.map((item) => ({ id: item.id, title: item.title })).filter((item) => item.id !== this.state.selectedItem.id);

  checkSelectedFile = (item) => {
    const { selectedItem } = this.state;

    if (selectedItem === null) {
      return false;
    }

    if (item.id === selectedItem.id) {
      return true;
    } else {
      return false;
    }
  };

  getSelectedImage = () => {
    const { selectedItem } = this.state;

    if (selectedItem === null) {
      return "";
    }

    return "#" + selectedItem.title.replace(/ /g, "_");
  };

  /*Handlers*/

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (event) => {
    let fileReader = new FileReader();
    let name = "";
    let size = 0;

    try {
      ({ name, size } = event.target.files[0]);
    } catch (ex) {
      return;
    }

    if (size > 25000000) {
      alert("La imagen no puede exceder los 25mb.");
      return;
    }

    const nameArray = name.split(".");
    const extension = nameArray[nameArray.length - 1];

    if (extension !== "jpg" && extension !== "jpeg" && extension !== "png" && extension !== "tif") {
      alert("Esta imagen no es válida.");
      return;
    }

    fileReader.addEventListener("load", (e) => {
      let imageString = e.target.result;
      this.setState({ fileString: imageString });
    });
    this.setState({ file: event.target.files[0] });
    fileReader.readAsDataURL(event.target.files[0]);
  };

  handleRemoveFile = () => {
    this.setState({ file: null, fileString: "" });
  };

  handleAddItem = (e) => {
    e.preventDefault();
    const { file, fileString, title, tourList } = this.state;

    if (file === null) {
      alert("Debe seleccionar una imagen.");
      return;
    }

    if (tourList.length >= 15) {
      alert("Ha alcanzado el límite de elementos en el tour.");
      return;
    }

    let id = parseInt(Math.random() * 1000000);

    this.setState({
      tourList: [...tourList, { id, title, file, fileString, destinationLinks: [] }],
      file: null,
      fileString: "",
      title: "",
    });
  };

  handleRemoveItem = (fileId) => {
    if (window.confirm("Está por eliminar un área ¿desea continuar?")) {
      const { selectedItem } = this.state;
      if (selectedItem !== null) {
        if (fileId === selectedItem.id) {
          this.setState({
            tourList: this.state.tourList.filter((item) => item.id !== fileId),
            selectedItem: null,
          });
        }
      } else {
        this.setState({
          tourList: this.state.tourList.filter((item) => item.id !== fileId),
        });
      }
    }
  };

  handleItemSelect = (item) => {
    let { selectedItem } = this.state;

    if (selectedItem !== null) {
      this.setState({
        selectedItem: item,
      });
    } else {
      this.setState({ selectedItem: item });
    }
  };

  //Gets the clicked position to genereate the new item.
  handlePointClick = (event) => {
    let { x, y, z } = event.detail.intersection.point;

    let element = { x, y, z };

    this.setState({
      pointElement: element,
    });
  };

  //Add the generated element to destinationLinks.
  handleAddLink = () => {
    let { link, pointElement, selectedItem, tourList } = this.state;
    if (link === "" || pointElement === null) {
      alert("Debe elegir un destino antes de agregar.");
      return;
    }

    if (selectedItem.destinationLinks.length >= 5) {
      alert("No puede agregar más de 5 enlaces por escena.");
      return;
    }

    const id = parseInt(Math.random() * 1000000);

    let updatedItem = { ...selectedItem, destinationLinks: [...selectedItem.destinationLinks, { id, link, ...pointElement }] };

    this.setState({
      selectedItem: updatedItem,
      tourList: tourList.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
    });
  };

  handleRemoveLink = (element) => {
    let { selectedItem } = this.state;
    selectedItem.destinationLinks = selectedItem.destinationLinks.filter((item) => item.id !== element.id);

    this.setState({
      selectedItem,
      tourList: this.state.tourList.map((item) => (item.id === selectedItem.id ? selectedItem : item)),
      hoveredLinkElement: null,
    });
  };

  handleCursorHover = (element) => {
    this.setState({ hoveredLinkElement: element });
  };

  showDialogMessage = (type, message) => {
    this.setState({ dialogType: type, dialogMessage: message, dialogIsOpen: true });
  };

  handleTourSave = async () => {
    this.showLoadingScreen();

    let { id, tourList } = this.state;
    let tempTourList = []; //tempTourList is the one that will be sent to the server.

    let data = new FormData();

    for (let i = 0; i < tourList.length; i++) {
      data.append("file", tourList[i].file);

      let { id, title, destinationLinks } = tourList[i];
      let { name } = tourList[i].file;
      tempTourList.push({ id, title, fileName: name, destinationLinks });
    }

    data.append("tourList", JSON.stringify(tempTourList));
    data.append("id", id);

    const config = {
      onUploadProgress: (p) => {
        this.setState({ loadingProgress: (p.loaded / p.total) * 100 });
      },
    };

    axios
      .post("http://localhost:4000/api/tour/save", data, config)
      .then((response) => {
        console.log("Response: ", response);
        this.hideLoadingScreen();
        this.showDialogMessage("success", "Tour guardado");
      })
      .catch((error) => {
        console.error("Cannot save tour.", error);
        this.hideLoadingScreen();
        this.showDialogMessage("error", "No se pudo guardar tour correctamente");
      });
  };

  render() {
    return (
      <div className="tour-editor">
        <LoadingScreen isOpen={this.state.loadingVisible} progress={this.state.loadingProgress} />
        <DialogMessage
          type={this.state.dialogType}
          message={this.state.dialogMessage}
          handleClose={this.hideDialogMessage}
          handleSuccess={() => this.props.history.push("/admin/estate")}
          isOpen={this.state.dialogIsOpen}
        />
        <div className="tour-editor-header">
          <CustomButton text="Inmuebles" color="secondary" small icon="arrow_back" onClick={() => this.props.history.push("/admin/estate")} />
          <h1>
            <Icon tag="3d_rotation" /> Editor de Tour
          </h1>
          <CustomButton text="Guardar Tour" color="primary" small icon="save" disabled={!this.state.tourList.length > 0} onClick={this.handleTourSave} />
        </div>
        <div className="tour-editor-body">
          <div className="editor-sidebar">
            <form className="editor-input" onSubmit={this.handleAddItem}>
              <FileInput
                name="tourFile"
                file={this.state.file}
                label="Seleccionar imagen..."
                accept="image/x-png,image/jpeg,image/jpg"
                onChange={this.handleFileChange}
                onRemove={this.handleRemoveFile}
                wide
                small
              />
              <div>
                <FormInput name="title" placeholder="Título" handleChange={this.handleChange} value={this.state.title} width="160" small required />
                <span style={{ display: "flex", alignItems: "center" }}>{this.state.tourList.length}/15</span>
                <CustomButton type="submit" icon="add" text="Agregar" color="secondary" small />
              </div>
            </form>
            <div className="editor-list">
              {this.state.tourList.map((item) => (
                <div key={item.id} onClick={() => this.handleItemSelect(item)} className={`list-item ${this.checkSelectedFile(item) ? "selected" : ""}`} title="Seleccionar">
                  <div>
                    <img src={item.fileString} alt={item.title} />
                  </div>
                  <div>{item.title}</div>
                  <div title="Eliminar" onClick={() => this.handleRemoveItem(item.id)}>
                    <Icon tag="cancel" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="editor-scene">
            {this.state.selectedItem != null ? (
              <div className="editor-bar">
                <FormSelect name="link" label="Destino: " handleChange={this.handleChange} value={this.state.link} items={this.getDestinationLinks()} displayValue="title" />

                {this.state.editMode ? (
                  <CustomButton text="Eliminar" color="danger" small onClick={() => this.handleRemoveLink(this.state.hoveredLinkElement)} disabled={this.state.hoveredLinkElement === null} />
                ) : (
                  <CustomButton text="Agregar" color="primary" small onClick={() => this.handleAddLink()} />
                )}
                <CustomButton text={this.state.editMode ? "Modo: Editar" : "Modo: Agregar"} color="secondary" small onClick={() => this.setState({ editMode: !this.state.editMode })} />
              </div>
            ) : null}
            <Scene embedded vr-mode-ui="enabled: false">
              <Entity primitive="a-assets" events={{ loaded: () => console.log("Loaded") }}>
                <img id="tour_editor_enter" src="/icons/tour_editor_enter.png" alt="Enter icon" />
                {this.state.tourList.map(({ id, title, fileString }) => (
                  <img key={id} alt={title} id={title.replace(/ /g, "_")} src={fileString} crossOrigin="anonymous" />
                ))}
              </Entity>
              <Entity primitive="a-sky" src={this.getSelectedImage()} events={{ loaded: () => console.log("Loaded Sky") }} />
              <Entity light="type: ambient; color: #FFF; angle:360;" />
              <Entity primitive="a-camera" look-controls={{ enabled: "true", pointerLockEnabled: "false" }}>
                <Entity primitive="a-cursor" />
                {!this.state.editMode ? (
                  <Entity id="main-box" primitive="a-box" position="0 0 -5" width="0.5" height="0.5" material={{ opacity: "0" }} events={{ click: (event) => this.handlePointClick(event) }} />
                ) : null}
                {this.state.selectedItem === null ? (
                  <Entity
                    primitive="a-text"
                    text={{
                      value: "Seleccione un elemento del tour",
                      width: "10",
                    }}
                    color="black"
                    position="-3 1 -5"
                  />
                ) : null}
              </Entity>
              {this.state.selectedItem !== null
                ? this.state.selectedItem.destinationLinks.map((element) => (
                    <Entity
                      key={element.id}
                      src="#tour_editor_enter"
                      primitive="a-circle"
                      rotation="0 0 0"
                      radius="0.2"
                      position={`${element.x} ${element.y} ${element.z}`}
                      events={{
                        mouseenter: () => this.handleCursorHover(element),
                        mouseleave: () => this.handleCursorHover(null),
                      }}
                      animation__mouseenter="property: components.material.material.opacity; type: opacity; from: 1; to: 0.5; startEvents: mouseenter; dur: 200"
                      animation__mouseleave="property: components.material.material.opacity; type: opacity; from: 0.5; to: 1; startEvents: mouseleave; dur: 200"
                      look-at="[camera]"
                    />
                  ))
                : null}
            </Scene>
          </div>
        </div>
      </div>
    );
  }
}

export default TourEditor;
