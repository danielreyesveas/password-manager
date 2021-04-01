import { useEffect, useRef, useState } from "react";
import { useUI } from "../context";
import { PasswordGenerator } from "../utils/generator";
import Slider from "@material-ui/core/Slider";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Overlay from "./layout/Overlay";

const GreenCheckbox = withStyles({
	root: {
		"&$checked": {
			color: "#34be5b",
		},
	},
	checked: {},
})(Checkbox);

const LengthSlider = withStyles({
	root: {
		color: "#34be5b",
		height: 8,
	},
	thumb: {
		backgroundColor: "#fff",
		border: "2px solid currentColor",

		"&:focus, &:hover, &$active": {
			boxShadow: "inherit",
		},
	},
	active: {},
	valueLabel: {
		left: "calc(-50% + 4px)",
	},
})(Slider);

const LengthLabel = withStyles({
	root: {
		color: "#f7f7f7",
		height: 8,
		marginBottom: 4,
	},
})(InputLabel);

const initialOptions = {
	length: 8,
	digits: true,
	lower: true,
	upper: true,
	special: false,
	brackets: false,
	high: false,
	ambiguous: false,
	name: "Custom",
	title: "default preset",
};

const emptyOptions = {
	digits: false,
	lower: true,
	upper: true,
	special: false,
	brackets: false,
	high: false,
	ambiguous: false,
	name: "Pronounceable",
	title: "default preset",
};

const Generator = ({ groups, selectedGroup, addPassword }) => {
	const copyRef = useRef(null);
	const [options, setOptions] = useState(initialOptions);
	const [generatedPassword, setGeneratedPassword] = useState("");
	const [pronounceable, setPronounceable] = useState(false);
	const { showGenerator, setShowGenerator } = useUI();

	const handleCheckboxChange = (event) => {
		if (event.target.name !== "upper" && event.target.name !== "lower") {
			setPronounceable(false);
			setOptions({
				...options,
				[event.target.name]: event.target.checked,
				name: "Custom",
			});
		} else {
			setOptions({
				...options,
				[event.target.name]: event.target.checked,
			});
		}
	};

	const handleChangePronounceable = (checked) => {
		setPronounceable(checked);
		if (checked) {
			setOptions({ ...options, ...emptyOptions });
		}
	};

	const handleSliderChange = (event, newValue) => {
		setOptions({ ...options, length: newValue });
	};

	const handleGenerate = () => {
		setGeneratedPassword(PasswordGenerator.generate(options));
	};

	const handleCopy = () => {
		copyRef.current.select();
		document.execCommand("copy");
		setTimeout(() => {
			setShowGenerator(false);
		}, 500);
	};

	useEffect(() => {
		handleGenerate();
		// eslint-disable-next-line
	}, [options]);

	const hideModal = () => {
		setShowGenerator(false);
	};

	return showGenerator ? (
		<Overlay onClickOutside={hideModal} onEscape={hideModal}>
			<div className="password-generator__main generator-main">
				<div className="dialog-header-options">
					<h3>Generar Contraseña</h3>
					<span
						aria-label="Cerrar"
						className="cancel-x"
						onClick={hideModal}
						onKeyDown={hideModal}
						tabIndex={0}
						role="button"
					>
						X
					</span>
				</div>

				<FormGroup row>
					<LengthLabel component="label">
						Longitud: {options.length}
					</LengthLabel>

					<LengthSlider
						aria-label="Longitud"
						value={options.length}
						min={3}
						max={32}
						name="length"
						onChange={handleSliderChange}
						aria-labelledby="Slider"
					/>
				</FormGroup>

				<FormGroup row>
					<FormControlLabel
						control={
							<GreenCheckbox
								icon={
									<CheckBoxOutlineBlankIcon fontSize="small" />
								}
								checkedIcon={<CheckBoxIcon fontSize="small" />}
								name="upper"
								checked={options.upper}
								onChange={handleCheckboxChange}
							/>
						}
						label="ABC"
					/>

					<FormControlLabel
						control={
							<GreenCheckbox
								icon={
									<CheckBoxOutlineBlankIcon fontSize="small" />
								}
								checkedIcon={<CheckBoxIcon fontSize="small" />}
								name="lower"
								checked={options.lower}
								onChange={handleCheckboxChange}
							/>
						}
						label="abc"
					/>

					<FormControlLabel
						control={
							<GreenCheckbox
								icon={
									<CheckBoxOutlineBlankIcon fontSize="small" />
								}
								checkedIcon={<CheckBoxIcon fontSize="small" />}
								name="digits"
								checked={options.digits}
								onChange={handleCheckboxChange}
							/>
						}
						label="123"
					/>

					<FormControlLabel
						control={
							<GreenCheckbox
								icon={
									<CheckBoxOutlineBlankIcon fontSize="small" />
								}
								checkedIcon={<CheckBoxIcon fontSize="small" />}
								name="special"
								checked={options.special}
								onChange={handleCheckboxChange}
							/>
						}
						label="!@#"
					/>
				</FormGroup>

				<FormGroup row>
					<FormControlLabel
						control={
							<GreenCheckbox
								icon={
									<CheckBoxOutlineBlankIcon fontSize="small" />
								}
								checkedIcon={<CheckBoxIcon fontSize="small" />}
								name="brackets"
								checked={options.brackets}
								onChange={handleCheckboxChange}
							/>
						}
						label="({<"
					/>

					<FormControlLabel
						control={
							<GreenCheckbox
								icon={
									<CheckBoxOutlineBlankIcon fontSize="small" />
								}
								checkedIcon={<CheckBoxIcon fontSize="small" />}
								name="high"
								checked={options.high}
								onChange={handleCheckboxChange}
							/>
						}
						label="äæ±"
					/>

					<FormControlLabel
						control={
							<GreenCheckbox
								icon={
									<CheckBoxOutlineBlankIcon fontSize="small" />
								}
								checkedIcon={<CheckBoxIcon fontSize="small" />}
								name="ambiguous"
								checked={options.ambiguous}
								onChange={handleCheckboxChange}
							/>
						}
						label="0Oo"
					/>

					<FormControlLabel
						control={
							<GreenCheckbox
								icon={
									<CheckBoxOutlineBlankIcon fontSize="small" />
								}
								checkedIcon={<CheckBoxIcon fontSize="small" />}
								name="pronounceable"
								checked={pronounceable}
								onChange={(e) =>
									handleChangePronounceable(e.target.checked)
								}
							/>
						}
						label="Pronunciable"
					/>
				</FormGroup>

				<FormGroup row className="generated-password">
					<input
						name="generatedPassword"
						type="text"
						ref={copyRef}
						value={generatedPassword}
						onChange={(e) => setGeneratedPassword(e.target.value)}
					/>
				</FormGroup>

				<div className="btns">
					<span
						aria-label="Cancelar"
						className="cancel"
						onClick={hideModal}
						onKeyDown={hideModal}
						tabIndex={0}
						role="button"
					>
						Cerrar
					</span>
					<button
						className="submit"
						type="button"
						onClick={handleCopy}
					>
						Copiar
					</button>
				</div>
			</div>
		</Overlay>
	) : null;
};

export default Generator;
