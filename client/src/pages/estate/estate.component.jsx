import React from "react";
import axios from "axios";
import qs from "qs";

import FormInput from "../../components/form-input/form-input.component";
import FormSelect from "../../components/form-select/form-select.component";
import FormSidebar from "../../components/form-sidebar/form-sidebar.component";
import FormTextarea from "../../components/form-textarea/form-textarea.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageList from "../../components/image-list/image-list.component";
import CheckList from "../../components/check-list/check-list.component";
import FormTab from "../../components/form-tab/form-tab.component";
import CustomModal from "../../components/custom-modal/custom-modal.component";

import "./estate.styles.scss";

//TODO: Show message when saving estate.
//TODO: Button to clean form.
//TODO: Save images.
//TODO: Save amenities.

class Estate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      title: "",
      description: "",
      geo_x: "",
      geo_y: "",
      bedrooms: 1,
      bathrooms: 1,
      parking: 0,
      tourId: 0,
      contractType: 0,
      contractTypes: [],
      estateType: 0,
      estateTypes: [],
      provinceId: 0,
      provinces: [],
      municipalityId: 0,
      municipalities: [],
      sectorId: 0,
      sectors: [],
      currencyId: 0,
      currencies: [],
      price: "",
      dateLimit: "",
      active: false,
      amenity: 0,
      amenities: [],
      gallery: [],
      tabPosition: 0,
      estates: [],
      titleToFind: "",
      contractTypeToFind: 0,
      estateTypeToFind: 0,
      modalIsOpen: false,
      modalType: "",
      modalMessage: ""
    };
  }

  showMessage = (type, message) => {
    this.setState({
      modalIsOpen: true,
      modalType: type,
      modalMessage: message
    });
  }

  componentDidMount = async () => {

    let formResponse = {};
    let estatesResponse = {};

    try {
      formResponse = await axios.get("http://localhost:4000/api/estate/form");
      estatesResponse = await axios.get("http://localhost:4000/api/estate/form/estates");
    } catch (ex) {
      formResponse.data = {
        contractTypes: [],
        estateTypes: [],
        provinces: [],
        currencies: [],
        amenities: []
      };

      estatesResponse.data = { estates: [] };

      this.showMessage("error", "No se pudo cargar la información del formulario, intente más tarde.");
    }

    const { contractTypes, estateTypes, currencies, provinces, amenities } = formResponse.data;
    const { estates } = estatesResponse.data;

    this.setState({
      contractTypes,
      estateTypes,
      provinces,
      currencies,
      amenities,
      estates
    });
  }

  handleChange = (event) => {
    const { value, name, type } = event.target;

    if (type === "checkbox") {
      const oldValue = this.state[`${name}`];
      this.setState({ [name]: !oldValue });
    } else {
      this.setState({ [name]: value });
    }

    if (name === "provinceId") {
      console.log("inside");
      axios.get(`http://localhost:4000/api/estate/form/municipalities?id=${value}`)
        .then(res => {
          const { municipalities } = res.data;
          this.setState({ municipalities });
        }).catch(ex => console.error("Could not load municipalities data."));
    }

    if (name === "municipalityId") {
      console.log("inside");
      axios.get(`http://localhost:4000/api/estate/form/sectors?id=${value}`)
        .then(res => {
          const { sectors } = res.data;
          this.setState({ sectors });
        }).catch(ex => console.error("Could not load sectors data."));
    }
  }

  handleGalleryChange = (event) => {
    let fileReader = new FileReader();

    console.log(">>> File: ", event.target.files[0]);

    const { name, size } = event.target.files[0];

    if (size > 2000000) {
      alert("La imagen no puede exceder los 2mb.");
      return;
    }

    fileReader.addEventListener("load", e => {
      let imageString = e.target.result;
      let image = { id: Math.random(), name, imageString };
      this.setState({ gallery: [...this.state.gallery, image] });
    });

    fileReader.readAsDataURL(event.target.files[0]);
  }

  handleImageRemoveClick = (id) => {
    this.setState({ gallery: this.state.gallery.filter(item => (item.id !== id)) });
  }

  handleCheckListClick = (id) => {
    this.setState({
      amenities: this.state.amenities.map(item => (
        item.id === id ? { ...item, active: (item.active === 0 ? 1 : 0) } : item
      ))
    });
  }

  handleCheckListReset = (e) => {
    let { amenity } = this.state;

    this.setState({
      amenities: this.state.amenities.map(item => ({ ...item, active: !amenity })),
      amenity: !amenity
    });
  }

  handleSaveSubmit = (e) => {
    e.preventDefault();
    let {
      id,
      title,
      description,
      geo_x,
      geo_y,
      bedrooms,
      bathrooms,
      parking,
      tourId,
      contractType,
      estateType,
      provinceId,
      municipalityId,
      sectorId,
      currencyId,
      price,
      dateLimit,
      active,
      amenities,
      gallery
    } = this.state;

    axios.post("http://localhost:4000/api/estate/form/save", qs.stringify({
      id,
      title,
      description,
      geo_x,
      geo_y,
      bedrooms,
      bathrooms,
      parking,
      tourId,
      contractType,
      estateType,
      provinceId,
      municipalityId,
      sectorId,
      currencyId,
      price,
      dateLimit,
      active,
      amenities,
      gallery
    }))
      .then(res => {
        const { message } = res.data;
        if (message === "INSERTED") {
          alert("Inmueble creado");
        } else if (message === "UPDATED") {
          alert("Inmueble actualizado");
        } else {
          alert("No se pudo guardar cambios");
        }
      }).catch(ex => {
        console.error("Could not save estate.");
        alert("No se pudo guardar cambios");
      });
  }

  handleFindSubmit = async (e) => {
    e.preventDefault();

    let estatesResponse = {};

    try {
      estatesResponse = await axios.get(`http://localhost:4000/api/estate/form/estates?title=${this.state.titleToFind}&contract_type=${this.state.contractTypeToFind}&estate_type=${this.state.estateTypeToFind}`);
    } catch (ex) {
      estatesResponse.data = { estates: [] };
      this.showMessage("error", "No se pudo cargar información de búsqueda.");
    }

    const { estates } = estatesResponse.data;

    this.setState({ estates });
  }

  handleIdSelect = async (id) => {
    let formResponse = {};

    try {
      formResponse = await axios.get("http://localhost:4000/api/estate/form/estate?id=" + id);
    } catch (ex) {
      this.showMessage("error", "No se pudo cargar inmuble seleccionado.");
      console.error(ex.message);
    }

    let { estate, amenities } = formResponse.data;

    let municipalities = await axios.get(`http://localhost:4000/api/estate/form/municipalities?id=${estate.provinceId}`)
      .then(res => res.data.municipalities)
      .catch(ex => { console.error("Could not load municipalities data."); return []; });

    let sectors = await axios.get(`http://localhost:4000/api/estate/form/sectors?id=${estate.municipalityId}`)
      .then(res => res.data.sectors)
      .catch(ex => { console.error("Could not load sectors data."); return []; });

    this.setState({ id, tabPosition: 1, amenities, municipalities, sectors, ...estate });
  }

  handleTab = (tabPosition) => {
    this.setState({ tabPosition });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="estate">
        <h2 className="title">Adminstración - Inmobiliarios</h2>
        <div className="main-area">
          <CustomModal isOpen={this.state.modalIsOpen} type={this.state.modalType} title="Mensaje" closeModal={this.closeModal}>
            {this.state.modalMessage}
          </CustomModal>
          <FormSidebar current={1} />
          <div className="form-area">
            <FormTab handleTab={this.handleTab} tabPosition={this.state.tabPosition} />
            {this.state.tabPosition === 0 ?
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
                    name="contractTypeToFind"
                    label="Tipo de contrato"
                    value={this.state.contractTypeToFind}
                    handleChange={this.handleChange}
                    items={this.state.contractTypes}
                  />
                  <FormSelect
                    name="estateTypeToFind"
                    label="Tipo de inmueble"
                    value={this.state.estateTypeToFind}
                    handleChange={this.handleChange}
                    items={this.state.estateTypes}
                  />
                  <CustomButton type="submit" color="primary" icon="search" text="Buscar" />
                </form>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Título</th>
                      <th scope="col">Tipo contrato</th>
                      <th scope="col">Tipo inmueble</th>
                      <th scope="col">Likes</th>
                      <th scope="col">Visitas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.estates.map(({ id, title, contract_type, estate_type, likes, views }) => (
                      <tr title="Seleccionar" key={id} onClick={() => this.handleIdSelect(id)}>
                        <td>{id}</td>
                        <td>{title}</td>
                        <td>{contract_type}</td>
                        <td>{estate_type}</td>
                        <td>{likes}</td>
                        <td>{views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              :
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
                    <FormTextarea
                      type="text"
                      name="description"
                      label="Descripción"
                      rows="5"
                      cols="40"
                      maxLength="256"
                      value={this.state.description}
                      handleChange={this.handleChange}
                      required
                    />
                    <FormInput
                      type="text"
                      name="geo_x"
                      label="Longitud"
                      value={this.state.geo_x}
                      handleChange={this.handleChange}
                      required
                    />
                    <FormInput
                      type="text"
                      name="geo_y"
                      label="Latitud"
                      value={this.state.geo_y}
                      handleChange={this.handleChange}
                      required
                    />
                    <FormInput
                      type="number"
                      name="bedrooms"
                      label="Habitaciones"
                      value={this.state.bedrooms}
                      handleChange={this.handleChange}
                      width="40"
                      required
                    />
                    <FormInput
                      type="number"
                      name="bathrooms"
                      label="Baños"
                      value={this.state.bathrooms}
                      handleChange={this.handleChange}
                      width="40"
                      required
                    />
                    <FormInput
                      type="number"
                      name="parking"
                      label="Parqueos"
                      value={this.state.parking}
                      handleChange={this.handleChange}
                      width="40"
                      required
                    />
                    <FormSelect
                      name="provinceId"
                      label="Provincia"
                      value={this.state.provinceId}
                      handleChange={this.handleChange}
                      items={this.state.provinces}
                      required
                    />
                    <FormSelect
                      name="municipalityId"
                      label="Municipio/Distrito"
                      value={this.state.municipalityId}
                      handleChange={this.handleChange}
                      items={this.state.municipalities}
                      required
                    />
                    <FormSelect
                      name="sectorId"
                      label="Sector"
                      value={this.state.sectorId}
                      handleChange={this.handleChange}
                      items={this.state.sectors}
                      required
                    />
                    <FormInput
                      type="number"
                      name="price"
                      label="Precio"
                      value={this.state.price}
                      placeholder="0.00"
                      handleChange={this.handleChange}
                      required
                    />
                    <FormSelect
                      name="currencyId"
                      label="Moneda"
                      value={this.state.currencyId}
                      handleChange={this.handleChange}
                      items={this.state.currencies}
                    />
                  </div>
                  <div className="form-col">
                    <ImageList
                      name="imageList"
                      onChange={this.handleGalleryChange}
                      items={this.state.gallery}
                      handleRemove={this.handleImageRemoveClick}
                    />
                    <FormSelect
                      name="contractType"
                      label="Tipo de contrato"
                      value={this.state.contractType}
                      handleChange={this.handleChange}
                      items={this.state.contractTypes}
                      required
                    />
                    <FormSelect
                      name="estateType"
                      label="Tipo de inmueble"
                      value={this.state.estateType}
                      handleChange={this.handleChange}
                      items={this.state.estateTypes}
                      required
                    />
                    <FormInput
                      type="date"
                      name="dateLimit"
                      label="Fecha de vigencia"
                      value={this.state.dateLimit}
                      handleChange={this.handleChange}
                      required
                    />
                    <CheckList
                      label="Amenidades"
                      mainCheck={this.state.amenity}
                      items={this.state.amenities}
                      handleItemClick={this.handleCheckListClick}
                      handleItemReset={this.handleCheckListReset}
                    />
                    <FormInput
                      type="checkbox"
                      name="active"
                      label="Estado de publicación"
                      checked={this.state.active}
                      handleChange={this.handleChange}
                      title="Al activar esta casilla la publicación será visible."
                      required
                    />
                  </div>
                  <div className="form-col controls">
                    <CustomButton type="submit" color="primary" icon="save" text="Guardar" />
                    <CustomButton color="secondary" icon="autorenew" text="Limpiar" />
                  </div>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Estate;