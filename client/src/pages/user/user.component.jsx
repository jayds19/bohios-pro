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

import "./user.styles.scss";

//TODO: Finish the user management.

class User extends React.Component {
  constructor() {
    super();

    this.state = {
      // Form data
      id: 0,
      userName: "",
      type: "",
      name: "",
      lastName: "",
      phone: "",
      email: "",
      companyName: "",
      companyPhone: "",
      companyEmail: "",
      active: true,
      tabPosition: 0,
      // Blog list
      userList: [],
      userNameToFind: "",
      typeToFind: "",
      activeToFind: "",
      // Messages
      dialogIsOpen: false,
      dialogType: "",
      dialogMessage: "",
      loadingVisible: false,
    };
  }

  componentDidMount = async () => {
    let userResponse = {};

    try {
      userResponse = await axios.get("http://localhost:4000/api/user/form/user-list");
    } catch (ex) {
      userResponse.data = { userList: [] };
      this.showMessage("error", "No se pudo cargar la información del formulario, intente más tarde.");
    }

    const { userList } = userResponse.data;

    this.setState({
      userList
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

  handleSaveSubmit = (e) => {
    e.preventDefault();
    this.showLoadingIndicator();
    let { id, userName, type, name, lastName, phone, email, companyName, companyPhone, companyEmail, active } = this.state;

    axios.post("http://localhost:4000/api/user/form/save",
      qs.stringify({
        id,
        userName,
        type,
        name,
        lastName,
        phone,
        email,
        companyName,
        companyPhone,
        companyEmail,
        active
      })
    ).then((res) => {
      const { message } = res.data;
      if (message === "INSERTED") {
        this.showMessage("success", "User creado");
        this.handleCleanForm();
      } else if (message === "UPDATED") {
        this.showMessage("success", "User actualizado");
        this.handleCleanForm();
      } else {
        this.showMessage("error", "No se pudo guardar cambios. No se pudo confirmar registro.");
      }
      this.hideLoadingIndicator();
    }).catch((ex) => {
      console.error("Could not save user.");
      this.showMessage("error", "No se pudo guardar cambios.");
      this.hideLoadingIndicator();
    });
  };

  handleCleanForm = () => {
    this.setState({
      // Form data
      id: 0,
      userName: "",
      type: "",
      name: "",
      lastName: "",
      phone: "",
      email: "",
      companyName: "",
      companyPhone: "",
      companyEmail: "",
      active: true,
    });
  };

  handleFindSubmit = async (e) => {
    e.preventDefault();

    let userResponse = {};

    try {
      userResponse = await axios.get(`http://localhost:4000/api/user/form/user-list?userName=${this.state.userNameToFind}&type=${this.state.typeToFind}&active=${this.state.activeToFind}`);
    } catch (ex) {
      userResponse.data = { userList: [] };
      this.showMessage("error", "No se pudo cargar información de búsqueda.");
    }

    const { userList } = userResponse.data;

    this.setState({ userList });
  };

  handleIdSelect = async (id) => {
    let formResponse = {};

    this.showLoadingIndicator();

    try {
      formResponse = await axios.get("http://localhost:4000/api/user/form/user?id=" + id);
    } catch (ex) {
      this.showMessage("error", "No se pudo cargar usuario seleccionado.");
      console.error(ex.message);
      this.hideLoadingIndicator();
      return;
    }

    let { user } = formResponse.data;

    console.log(">>> User:", user);

    this.setState({ id, tabPosition: 1, ...user });
    this.hideLoadingIndicator();
  };

  handleTab = async (tabPosition) => {
    this.setState({ tabPosition });
    if (tabPosition === 0) {
      this.handleCleanForm();

      let userResponse = {};

      try {
        userResponse = await axios.get("http://localhost:4000/api/user/form/user-list");
      } catch (ex) {
        userResponse.data = { userList: [] };
      }

      const { userList } = userResponse.data;
      this.setState({ userList });
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
      <div className="user-page">
        <LoadingIndicator visible={this.state.loadingVisible} />
        <DialogMessage
          isOpen={this.state.dialogIsOpen}
          type={this.state.dialogType}
          message={this.state.dialogMessage}
          handleClose={this.closeModal}
          handleSuccess={this.closeModal}
        />
        <h2 className="title">Adminstración - Usuarios</h2>
        <div className="main-area">
          <FormSidebar current={4} />
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
                    name="userNameToFind"
                    label="Usuario"
                    value={this.state.userNameToFind}
                    handleChange={this.handleChange}
                  />
                  <FormSelect
                    name="typeToFind"
                    label="Tipo"
                    value={this.state.typeToFind}
                    handleChange={this.handleChange}
                    items={[
                      { id: 0, description: "Inactivo" },
                      { id: 1, description: "Activo" },
                    ]}
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
                    {this.state.userList.map(
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

export default User;
