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

import "./promoted.styles.scss";

// TODO: Load image in instagram size.

class Promoted extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// Form data
			id: 0,
			title: "",
			link: "",
			active: true,
			tabPosition: 0,
			// Promoted list
			promotedList: [],
			titleToFind: "",
			activeToFind: 1,
			//Messages
			dialogIsOpen: false,
			dialogType: "",
			dialogMessage: "",
			loadingVisible: false,
		};
	}

	showMessage = (type, message) => {
		this.setState({
			dialogIsOpen: true,
			dialogType: type,
			dialogMessage: message,
		});
	};

	componentDidMount = async () => {
		let formResponse = {};
		let promotedResponse = {};

		try {
			formResponse = await axios.get("http://localhost:4000/api/estate/form");
			promotedResponse = await axios.get("http://localhost:4000/api/promoted/form/promoted-list");
		} catch (ex) {
			formResponse.data = {
				contractTypes: [],
				estateTypes: [],
				provinces: [],
				currencies: [],
				amenities: [],
			};

			promotedResponse.data = { promotedList: [] };

			this.showMessage("error", "No se pudo cargar la información del formulario, intente más tarde.");
		}

		const { contractTypes, estateTypes, currencies, provinces, amenities } = formResponse.data;
		const { promotedList } = promotedResponse.data;

		this.setState({
			contractTypes,
			estateTypes,
			provinces,
			currencies,
			amenities,
			promotedList,
		});
	};

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
		let { id, title, link, active } = this.state;

		axios
			.post(
				"http://localhost:4000/api/promoted/form/save",
				qs.stringify({
					id,
					title,
					link,
					active,
				})
			)
			.then((res) => {
				const { message } = res.data;
				if (message === "INSERTED") {
					this.showMessage("success", "Promocionado creado");
					this.handleCleanForm();
				} else if (message === "UPDATED") {
					this.showMessage("success", "Promocionado actualizado");
					this.handleCleanForm();
				} else {
					this.showMessage("error", "No se pudo guardar cambios. No se pudo confirmar registro.");
				}
				this.hideLoadingIndicator();
			})
			.catch((ex) => {
				console.error("Could not save promoted.");
				this.showMessage("error", "No se pudo guardar cambios.");
				this.hideLoadingIndicator();
			});
	};

	handleCleanForm = () => {
		this.setState({
			// Form data
			id: 0,
			title: "",
			link: "",
			active: true,
			// tabPosition: 0, In this case it is not necessary.
			// Promoted list
			promotedList: [],
			titleToFind: "",
			activeToFind: 1,
		});
	};

	handleFindSubmit = async (e) => {
		e.preventDefault();

		let promotedResponse = {};

		try {
			promotedResponse = await axios.get(`http://localhost:4000/api/promoted/form/promoted-list?title=${this.state.titleToFind}&active=${this.state.activeToFind}`);
		} catch (ex) {
			promotedResponse.data = { promotedList: [] };
			this.showMessage("error", "No se pudo cargar información de búsqueda.");
		}

		const { promotedList } = promotedResponse.data;

		this.setState({ promotedList });
	};

	handleIdSelect = async (id) => {
		let formResponse = {};

		this.showLoadingIndicator();

		try {
			formResponse = await axios.get("http://localhost:4000/api/promoted/form/promoted?id=" + id);
		} catch (ex) {
			this.showMessage("error", "No se pudo cargar promoción seleccionada.");
			console.error(ex.message);
			this.hideLoadingIndicator();
			return;
		}

		let { promoted } = formResponse.data;

		this.setState({ id, tabPosition: 1, ...promoted });
		this.hideLoadingIndicator();
	};

	handleTab = async (tabPosition) => {
		this.setState({ tabPosition });
		if (tabPosition === 0) {
			this.handleCleanForm();

			let promotedResponse = {};

			try {
				promotedResponse = await axios.get("http://localhost:4000/api/promoted/form/promoted-list");
			} catch (ex) {
				promotedResponse.data = { promotedList: [] };
			}

			const { promotedList } = promotedResponse.data;
			this.setState({ promotedList });
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
				<h2 className="title">Adminstración - Promocionados</h2>
				<div className="main-area">
					<FormSidebar current={2} />
					<div className="form-area">
						<FormTab handleTab={this.handleTab} tabPosition={this.state.tabPosition} />
						{this.state.tabPosition === 0 ? (
							<div className="list-area">
								<form onSubmit={this.handleFindSubmit}>
									<FormInput type="text" name="titleToFind" label="Título" value={this.state.titleTofind} handleChange={this.handleChange} />
									<FormSelect
										name="activeToFind"
										label="Estado"
										value={this.state.estateToFind}
										handleChange={this.handleChange}
										items={[
											{ id: 0, description: "Inactivo" },
											{ id: 1, description: "Activo" },
										]}
									/>
									<CustomButton type="submit" color="primary" icon="search" text="Buscar" />
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
										{this.state.promotedList.map(({ id, title, views, date, active }) => (
											<tr title="Seleccionar" key={id} onClick={() => this.handleIdSelect(id)}>
												<td>{id}</td>
												<td>{title}</td>
												<td>{views}</td>
												<td>{date}</td>
												<td>{active}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<div className="edit-area">
								<form onSubmit={this.handleSaveSubmit}>
									<div className="form-col">
										<FormInput type="text" name="title" label="Título" value={this.state.title} handleChange={this.handleChange} required />
										<FormInput type="text" name="link" label="Enlace" value={this.state.link} handleChange={this.handleChange} required />
									</div>
									<div className="form-col">
										<FormInput
											type="checkbox"
											name="active"
											label="Estado de la promoción"
											checked={this.state.active}
											handleChange={this.handleChange}
											title="Al activar esta casilla la promoción será visible."
											required
										/>
									</div>
									<div className="form-col controls">
										<CustomButton type="submit" color="primary" icon="save" text="Guardar" />
										<CustomButton onClick={this.handleCleanForm} color="secondary" icon="autorenew" text="Limpiar" />
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

export default Promoted;
