import React from "react";
import { Scene, Entity } from "aframe-react";
import axios from "axios";
import qs from "qs";
import "aframe";
import "aframe-look-at-component";

import FormInput from "../../components/form-input/form-input.component";
import FormSelect from "../../components/form-select/form-select.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import FileInput from "../../components/file-input/file-input.component";
import Icon from "../../components/icon/icon.component";
import CustomModal from "../../components/custom-modal/custom-modal.component";
import LoadingIndicator from "../../components/loading-indicator/loading-indicator.component";

import "./tour-editor.styles.scss";

//TODO: Guardar tour en bd.

class TourEditor extends React.Component {
  constructor() {
    super();

    this.state = {
      file: null,
      title: "",
      selectedItem: null,
      tourList: [],
      link: "",
      pointElement: null,
      editMode: false,
      hoveredLinkElement: null,
      modalIsOpen: false,
      modalMessage: "",
      modalType: "",
      loadingVisible: false,
    };
  }

  /*Functions*/

  showMessage = (type, message) => {
    this.setState({
      modalIsOpen: true,
      modalType: type,
      modalMessage: message,
    });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  showLoadingIndicator = () => {
    this.setState({ loadingVisible: true });
  };

  hideLoadingIndicator = () => {
    this.setState({ loadingVisible: false });
  };

  getDestinationLinks = () =>
    this.state.tourList
      .map((item) => ({ id: item.id, title: item.title }))
      .filter((item) => item.id !== this.state.selectedItem.id);

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

    if (size > 15000000) {
      alert("La imagen no puede exceder los 15mb.");
      return;
    }

    const extension = name.split(".")[1];

    if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
      alert("Esta imagen no es válida.");
      return;
    }

    fileReader.addEventListener("load", (e) => {
      let imageString = e.target.result;
      let image = { name, imageString };
      this.setState({ file: image });
    });
    this.setState({ diskFile: event.target.files[0] });
    fileReader.readAsDataURL(event.target.files[0]);
  };

  handleRemoveFile = () => {
    this.setState({ file: null });
  };

  handleAddItem = (e) => {
    e.preventDefault();
    const { file, title, tourList } = this.state;

    if (file === null) {
      alert("Debe seleccionar una imagen.");
    }

    let id = parseInt(Math.random() * 1000000);

    this.setState({
      tourList: [...tourList, { id, title, file, destinationLinks: [] }],
      file: null,
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
    const { selectedItem } = this.state;

    if (selectedItem === null) {
      this.setState({ selectedItem: item });
      return;
    }

    if (item.id !== selectedItem.id) {
      this.setState({ selectedItem: item });
    }
  };

  handleAssetsLoad = () => {
    alert("Cargado!!!");
  };

  //Gets the clicked position to genereate the new item.
  handlePointClick = (event) => {
    let { x, y, z } = event.detail.intersection.point;

    let element = { x, y, z };

    let id = parseInt(Math.random() * 1000000);
    element.id = id;

    this.setState({
      pointElement: element,
    });
  };

  //Add the generated element to destinationLinks.
  handleAddLink = (element) => {
    if (this.state.link === "" || element === null) {
      alert("Debe elegir un destino antes de agregar.");
      return;
    }

    element.link = this.state.link;
    let { selectedItem } = this.state;

    this.setState({
      tourList: this.state.tourList.map((item) =>
        item.id === selectedItem.id
          ? { ...item, destinationLinks: [...item.destinationLinks, element] }
          : item
      ),
      selectedItem: {
        ...selectedItem,
        destinationLinks: [...selectedItem.destinationLinks, element],
      },
    });
  };

  handleRemoveLink = (element) => {
    let { selectedItem } = this.state;
    selectedItem.destinationLinks = selectedItem.destinationLinks.filter(
      (item) => item.id !== element.id
    );

    this.setState({
      selectedItem,
      tourList: this.state.tourList.map((item) =>
        item.id === selectedItem.id ? selectedItem : item
      ),
      hoveredLinkElement: null,
    });
  };

  handleCursorHover = (element) => {
    this.setState({ hoveredLinkElement: element });
  };

  handleTourSave = async () => {
    //this.showLoadingIndicator();

    let { tourList } = this.state;

    const config = {
      onUploadProgress: progressEvent => console.log(progressEvent.loaded)
    }

    const response = await axios.post(
      "http://localhost:4000/api/tour/save",
      qs.stringify({ tourList }),
      config
    );
    /*
      .then((res) => {
        const { message } = res.data;
        this.showMessage("success", "Tour enviado");
        this.setState({ display: "none" });
        //this.hideLoadingIndicator();
      })
      .catch((ex) => {
        console.error("Could not save tour.");
        this.setState({ display: "none" });
        //this.hideLoadingIndicator();
        //this.showMessage("error", "No se pudo guardar cambios.");
      });
      */
  };

  render() {
    return (
      <div className="tour-editor">
        <LoadingIndicator visible={this.state.loadingVisible} />
        <CustomModal
          isOpen={this.state.modalIsOpen}
          type={this.state.modalType}
          title="Mensaje"
          closeModal={this.closeModal}
        >
          {this.state.modalMessage}
        </CustomModal>
        <div className="tour-editor-header">
          <h1>Editor de Tour</h1>
          <CustomButton
            text="Guardar Tour"
            color="success"
            small
            icon="save"
            disabled={(!this.state.tourList.length > 0)}
            onClick={this.handleTourSave}
          />
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
                <FormInput
                  name="title"
                  placeholder="Título"
                  handleChange={this.handleChange}
                  value={this.state.title}
                  small
                  required
                />
                <CustomButton
                  type="submit"
                  icon="add"
                  text="Agregar"
                  color="secondary"
                  small
                />
              </div>
            </form>
            <div className="editor-list">
              {this.state.tourList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => this.handleItemSelect(item)}
                  className={`list-item ${
                    this.checkSelectedFile(item) ? "selected" : ""
                    }`}
                  title="Seleccionar"
                >
                  <div>
                    <img src={item.file.imageString} alt={item.title} />
                  </div>
                  <div>{item.title}</div>
                  <div
                    title="Eliminar"
                    onClick={() => this.handleRemoveItem(item.id)}
                  >
                    <Icon tag="cancel" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="editor-scene">
            {this.state.selectedItem != null ? (
              <div className="editor-bar">
                <FormSelect
                  name="link"
                  label="Destino: "
                  handleChange={this.handleChange}
                  value={this.state.link}
                  items={this.getDestinationLinks()}
                  displayValue="title"
                />

                {this.state.editMode ? (
                  <CustomButton
                    text="Eliminar"
                    color="danger"
                    small
                    onClick={() =>
                      this.handleRemoveLink(this.state.hoveredLinkElement)
                    }
                    disabled={this.state.hoveredLinkElement === null}
                  />
                ) : (
                    <CustomButton
                      text="Agregar"
                      color="primary"
                      small
                      onClick={() => this.handleAddLink(this.state.pointElement)}
                    />
                  )}
                <CustomButton
                  text={this.state.editMode ? "Modo: Editar" : "Modo: Agregar"}
                  color="secondary"
                  small
                  onClick={() =>
                    this.setState({ editMode: !this.state.editMode })
                  }
                />
              </div>
            ) : null}
            <Scene embedded vr-mode-ui="enabled: false">
              <Entity
                primitive="a-assets"
                events={{ loaded: () => console.log("Loaded") }}
              >
                <img
                  id="tour_editor_enter"
                  src="/icons/tour_editor_enter.png"
                  alt="Enter icon"
                />
                {this.state.tourList.map(({ id, title, file }) => (
                  <img
                    key={id}
                    alt={title}
                    id={title.replace(/ /g, "_")}
                    src={file.imageString}
                  />
                ))}
              </Entity>
              <Entity primitive="a-sky" src={this.getSelectedImage()} />
              <Entity
                primitive="a-camera"
                look-controls={{ enabled: "true", pointerLockEnabled: "false" }}
              >
                <Entity primitive="a-cursor" />
                {!this.state.editMode ? (
                  <Entity
                    id="main-box"
                    primitive="a-box"
                    position="0 0 -5"
                    width="0.5"
                    height="0.5"
                    material={{ opacity: "0" }}
                    events={{ click: (event) => this.handlePointClick(event) }}
                  />
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
