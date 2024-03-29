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
import DialogMessage from "../../components/dialog-message/dialog-message.component";
import LoadingIndicator from "../../components/loading-indicator/loading-indicator.component";

import "./estate.styles.scss";

//TODO: Save images names hashed in the directory.

class Estate extends React.Component {

	constructor() {
		super();

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
			//Messages
			dialogIsOpen: false,
			dialogType: "",
			dialogMessage: "",
			loadingVisible: false
		};
	}

	showMessage = (type, message) => {
		this.setState({
			dialogIsOpen: true,
			dialogType: type,
			dialogMessage: message
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
			axios.get(`http://localhost:4000/api/estate/form/municipalities?id=${value}`)
				.then(res => {
					const { municipalities } = res.data;
					this.setState({ municipalities });
				}).catch(ex => console.error("Could not load municipalities data."));
		}

		if (name === "municipalityId") {
			axios.get(`http://localhost:4000/api/estate/form/sectors?id=${value}`)
				.then(res => {
					const { sectors } = res.data;
					this.setState({ sectors });
				}).catch(ex => console.error("Could not load sectors data."));
		}
	}

	handleGalleryChange = (event) => {
		let fileReader = new FileReader();
		let name = "";
		let size = 0;

		try {
			({ name, size } = event.target.files[0]);
		} catch (ex) {
			return;
		}

		const nameExists = this.state.gallery.some(item => item.name === name);

		if (nameExists) {
			alert("Ya ha agregado una imagen con este nombre.");
			return;
		}

		const gallerySize = this.state.gallery.length;

		if (gallerySize >= 10) {
			alert("Ha alcanzado el límite de imágenes en la galería.");
			return;
		}

		const extension = name.split(".")[1];

		if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
			alert("Esta imagen no es válida.");
			return;
		}

		if (size > 2000000) {
			alert("La imagen no puede exceder los 2mb.");
			return;
		}

		fileReader.addEventListener("load", e => {
			let imageString = e.target.result;
			let image = { id: Math.random(), name, imageString, remove: 0 };
			this.setState({ gallery: [...this.state.gallery, image] });
		});

		fileReader.readAsDataURL(event.target.files[0]);
	}

	handleImageRemoveClick = (image) => {
		if (image.imageString === "") {
			this.setState({ gallery: this.state.gallery.map(item => (item.id === image.id ? ({ ...item, remove: 1 }) : item)) });
		} else {
			this.setState({ gallery: this.state.gallery.filter(item => (item.id !== image.id)) });
		}
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
		this.showLoadingIndicator();
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
					this.showMessage("success", "Inmueble creado");
					this.handleCleanForm();
				} else if (message === "UPDATED") {
					this.showMessage("success", "Inmueble actualizado");
					this.handleCleanForm();
				} else {
					this.showMessage("error", "No se pudo guardar cambios. No se pudo confirmar registro.");
				}
				this.hideLoadingIndicator();
			}).catch(ex => {
				console.error("Could not save estate.");
				this.showMessage("error", "No se pudo guardar cambios.");
				this.hideLoadingIndicator();
			});
	}

	handleCleanForm = () => {
		this.setState({
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
			estateType: 0,
			provinceId: 0,
			municipalityId: 0,
			sectorId: 0,
			currencyId: 0,
			price: "",
			dateLimit: "",
			active: false,
			amenity: 0,
			amenities: this.state.amenities.map(item => ({ ...item, active: 0 })),
			gallery: []
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

		this.showLoadingIndicator();

		try {
			formResponse = await axios.get("http://localhost:4000/api/estate/form/estate?id=" + id);
		} catch (ex) {
			this.showMessage("error", "No se pudo cargar inmuble seleccionado.");
			console.error(ex.message);
			this.hideLoadingIndicator();
			return;
		}

		let { estate, amenities, gallery } = formResponse.data;

		let municipalities = await axios.get(`http://localhost:4000/api/estate/form/municipalities?id=${estate.provinceId}`)
			.then(res => res.data.municipalities)
			.catch(ex => { console.error("Could not load municipalities data."); return []; });

		let sectors = await axios.get(`http://localhost:4000/api/estate/form/sectors?id=${estate.municipalityId}`)
			.then(res => res.data.sectors)
			.catch(ex => { console.error("Could not load sectors data."); return []; });

		this.setState({ id, tabPosition: 1, amenities, municipalities, sectors, ...estate, gallery });
		this.hideLoadingIndicator();
	}

	handleTab = async (tabPosition) => {
		this.setState({ tabPosition });
		if (tabPosition === 0) {
			this.handleCleanForm();

			let estatesResponse = {};

			try {
				estatesResponse = await axios.get("http://localhost:4000/api/estate/form/estates");
			} catch (ex) {
				estatesResponse.data = { estates: [] };
			}

			const { estates } = estatesResponse.data;
			this.setState({ estates });
		}
	}

	closeModal = () => {
		this.setState({ dialogIsOpen: false });
	}

	showLoadingIndicator = () => {
		this.setState({ loadingVisible: true });
	}

	hideLoadingIndicator = () => {
		this.setState({ loadingVisible: false });
	}

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
				<h2 className="title">Adminstración - Inmobiliarios</h2>
				<div className="main-area">
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
										wide
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
										<CustomButton
											text="Editar Tour"
											color="secondary"
											icon="3d_rotation"
											disabled={(this.state.id === 0)}
											onClick={() => this.props.history.push(`${this.props.match.path}/tour-editor/${this.state.id}`)}
											title={(this.state.id === 0 ? "Debe guardar este inmueble para editar Tour" : "")}
										/>
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
										<CustomButton onClick={this.handleCleanForm} color="secondary" icon="autorenew" text="Limpiar" />
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
