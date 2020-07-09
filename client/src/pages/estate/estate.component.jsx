import React from "react";

import FormInput from "../../components/form-input/form-input.component";
import FormSelect from "../../components/form-select/form-select.component";
import FormSidebar from "../../components/form-sidebar/form-sidebar.component";
import FormTextarea from "../../components/form-textarea/form-textarea.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import ImageList from "../../components/image-list/image-list.component";
import CheckList from "../../components/check-list/check-list.component";

import "./estate.styles.scss";

//TODO: Lista de inmuebles registrados.

class Estate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      geo_x: "",
      geo_y: "",
      bedrooms: 1,
      bathrooms: 1,
      parking: 0,
      gallery: [],
      tourId: "",
      contractType: "",
      estateType: "",
      cityId: "",
      sectorId: "",
      price: "",
      dateLimit: "",
      contractTypeList: [{ id: 1, description: "Venta" }, { id: 2, description: "Alquiler (a corto plazo)" }, { id: 3, description: "Alquiler (a largo plazo)" }],
      estateTypeList: [{ id: 1, description: "Casa" }, { id: 2, description: "Apartamento" }, { id: 3, description: "Local" }],
      cities: [{ id: 1, description: "Santiago" }, { id: 2, description: "Villa Gonzales" }, { id: 3, description: "Moca" }],
      sectors: [{ id: 1, description: "Las Colinas" }, { id: 2, description: "El Ingco" }, { id: 3, description: "Los Salados" }],
      amenities: [{ id: 1, description: "Ascensor", active: 1 }, { id: 2, description: "Piscina", active: 0 }, { id: 3, description: "Gimnacio", active: 0 }, { id: 4, description: "Sistema de alarma", active: 0 }, { id: 5, description: "Patio", active: 0 }],
      amenity: 0,
      active: false
    };
  }

  handleChange = (event) => {
    const { value, name, type } = event.target;

    if (type === "checkbox") {
      const oldValue = this.state[`${name}`];
      this.setState({ [name]: !oldValue });
    } else {
      this.setState({ [name]: value });
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

  render() {
    return (
      <div className="estate">
        <h2 className="title">Adminstración - Inmobiliarios</h2>
        <div className="main-area">
          <FormSidebar current={1} />
          <div className="form-area">
            <form>
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
                  name="cityId"
                  label="Ciudad"
                  value={this.state.cityId}
                  handleChange={this.handleChange}
                  items={this.state.cities}
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
                  label="Precio RD$"
                  value={this.state.price}
                  placeholder="0.00"
                  handleChange={this.handleChange}
                  required
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
                  items={this.state.contractTypeList}
                  required
                />
                <FormSelect
                  name="estateType"
                  label="Tipo de inmueble"
                  value={this.state.estateType}
                  handleChange={this.handleChange}
                  items={this.state.estateTypeList}
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
                  label="Estado"
                  checked={this.state.active}
                  handleChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-col controls">
                <CustomButton type="submit" color="primary" icon="save" text="Guardar" />
                <CustomButton color="secondary" icon="autorenew" text="Limpiar" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Estate;