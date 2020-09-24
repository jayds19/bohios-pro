import React from "react";
import axios from "axios";
import qs from "qs";

import FormInput from "../../components/form-input/form-input.component";
import FormSelect from "../../components/form-select/form-select.component";
import FormSidebar from "../../components/form-sidebar/form-sidebar.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import FormTab from "../../components/form-tab/form-tab.component";
import DialogMessage from "../../components/dialog-message/dialog-message.component";
import LoadingIndicator from "../../components/loading-indicator/loading-indicator.component";
import CustomRichEditor from "../../components/custom-editor/custom-editor.component";

import "./blog.styles.scss";

// TODO: Link specific estates.
// TODO: Save blog.

class Blog extends React.Component {
  constructor() {
    super();

    this.state = {
      // Form data
      id: 0,
      title: "",
      html: "",
      active: true,
      tabPosition: 0,
      // Blog list
      blogList: [],
      titleToFind: "",
      activeToFind: "",
      estateToFind: "",
      // Messages
      dialogIsOpen: false,
      dialogType: "",
      dialogMessage: "",
      loadingVisible: false,
    };
  }

  componentDidMount = async () => {
    let blogResponse = {};

    try {
      blogResponse = await axios.get("http://localhost:4000/api/blog/form/blog-list");
    } catch (ex) {
      blogResponse.data = { blogList: [] };
      this.showMessage("error", "No se pudo cargar la información del formulario, intente más tarde.");
    }

    const { blogList } = blogResponse.data;

    this.setState({
      blogList
    });
  };

  // Functions

  showMessage = (type, message) => {
    this.setState({
      dialogIsOpen: true,
      dialogType: type,
      dialogMessage: message,
    });
  };

  // Handlers

  handleChange = (event) => {
    const { value, name, type } = event.target;

    if (type === "checkbox") {
      const oldValue = this.state[`${name}`];
      this.setState({ [name]: !oldValue });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleEditorChange = (value) => {
    //console.log(">>> handleEditorChange: ", value);
    this.setState({ html: value });
  }

  handleSaveSubmit = (e) => {
    e.preventDefault();
    this.showLoadingIndicator();
    let { id, title, html, active } = this.state;

    axios.post("http://localhost:4000/api/blog/form/save",
      qs.stringify({
        id,
        title,
        html,
        active,
      })
    ).then((res) => {
      const { message } = res.data;
      if (message === "INSERTED") {
        this.showMessage("success", "Blog creado");
        this.handleCleanForm();
      } else if (message === "UPDATED") {
        this.showMessage("success", "Blog actualizado");
        this.handleCleanForm();
      } else {
        this.showMessage("error", "No se pudo guardar cambios. No se pudo confirmar registro.");
      }
      this.hideLoadingIndicator();
    }).catch((ex) => {
      console.error("Could not save blog.");
      this.showMessage("error", "No se pudo guardar cambios.");
      this.hideLoadingIndicator();
    });
  };

  handleCleanForm = () => {
    this.setState({
      // Form data
      id: 0,
      title: "",
      html: "",
      active: true,
    });
  };

  handleFindSubmit = async (e) => {
    e.preventDefault();

    let blogResponse = {};

    try {
      blogResponse = await axios.get(`http://localhost:4000/api/blog/form/blog-list?title=${this.state.titleToFind}&active=${this.state.activeToFind}`);
    } catch (ex) {
      blogResponse.data = { blogList: [] };
      this.showMessage("error", "No se pudo cargar información de búsqueda.");
    }

    const { blogList } = blogResponse.data;

    this.setState({ blogList });
  };

  handleIdSelect = async (id) => {
    let formResponse = {};

    this.showLoadingIndicator();

    try {
      formResponse = await axios.get("http://localhost:4000/api/blog/form/blog?id=" + id);
    } catch (ex) {
      this.showMessage("error", "No se pudo cargar blog seleccionado.");
      console.error(ex.message);
      this.hideLoadingIndicator();
      return;
    }

    let { blog } = formResponse.data;

    console.log(">>> Blog:", blog);

    this.setState({ id, tabPosition: 1, ...blog });
    this.hideLoadingIndicator();
  };

  handleTab = async (tabPosition) => {
    this.setState({ tabPosition });
    if (tabPosition === 0) {
      this.handleCleanForm();

      let blogResponse = {};

      try {
        blogResponse = await axios.get("http://localhost:4000/api/blog/form/blog-list");
      } catch (ex) {
        blogResponse.data = { blogList: [] };
      }

      const { blogList } = blogResponse.data;
      this.setState({ blogList });
    }
  };

  closeModal = () => {
    this.setState({ dialogIsOpen: false });
  };

  showLoadingIndicator = () => {
    this.setState({ loadingVisible: true });
  };

  hideLoadingIndicator = () => {
    this.setState({ loadingVisible: false });
  };

  render() {
    return (
      <div className="estate">
        <LoadingIndicator visible={this.state.loadingVisible} />
        <DialogMessage
          isOpen={this.state.dialogIsOpen}
          type={this.state.dialogType}
          message={this.state.dialogMessage}
          handleClose={this.closeModal}
          handleSuccess={this.closeModal}
        />
        <h2 className="title">Adminstración - Blogs</h2>
        <div className="main-area">
          <FormSidebar current={3} />
          <div className="form-area">
            <FormTab
              handleTab={this.handleTab}
              tabPosition={this.state.tabPosition}
            />
            {this.state.tabPosition === 0 ? (
              <div className="list-area">
                <form onSubmit={this.handleFindSubmit}>
                  <FormInput
                    type="text"
                    name="titleToFind"
                    label="Título"
                    value={this.state.titleTofind}
                    handleChange={this.handleChange}
                  />
                  <FormSelect
                    name="activeToFind"
                    label="Estado"
                    value={this.state.activeToFind}
                    handleChange={this.handleChange}
                    items={[
                      { id: 0, description: "Inactivo" },
                      { id: 1, description: "Activo" },
                    ]}
                  />
                  <CustomButton
                    type="submit"
                    color="primary"
                    icon="search"
                    text="Buscar"
                  />
                </form>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Título</th>
                      <th scope="col">Visitas</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.blogList.map(
                      ({ id, title, views, date, active }) => (
                        <tr
                          title="Seleccionar"
                          key={id}
                          onClick={() => this.handleIdSelect(id)}>
                          <td>{id}</td>
                          <td>{title}</td>
                          <td>{views}</td>
                          <td>{date}</td>
                          <td>{active}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
                <div className="edit-area">
                  <form onSubmit={this.handleSaveSubmit}>
                    <div className="form-col">
                      <FormInput
                        type="text"
                        name="title"
                        label="Título"
                        value={this.state.title}
                        handleChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-col">
                      <CustomRichEditor
                        value={this.state.html}
                        onChange={this.handleEditorChange}
                      />
                      <FormInput
                        type="checkbox"
                        name="active"
                        label="Activo"
                        checked={this.state.active}
                        handleChange={this.handleChange}
                        title="Al activar esta casilla el blog será visible."
                        required
                      />
                    </div>
                    <div className="form-col controls">
                      <CustomButton
                        type="submit"
                        color="primary"
                        icon="save"
                        text="Guardar"
                      />
                      <CustomButton
                        onClick={this.handleCleanForm}
                        color="secondary"
                        icon="autorenew"
                        text="Limpiar"
                      />
                    </div>
                  </form>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
