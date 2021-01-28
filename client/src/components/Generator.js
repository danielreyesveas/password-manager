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
	const [password, setPassword] = useState("");
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
		setPassword(PasswordGenerator.generate(options));
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

	return showGenerator ? (
		<div className="add-task add-task__overlay" data-testid="add-task-comp">
			<div
				className="add-task__main generator-main"
				data-testid="add-task-main"
			>
				<div data-testid="quick-add-task">
					<span
						aria-label="Cancel adding task"
						className="add-task__cancel-x"
						data-testid="add-task-quick-cancel"
						onClick={() => setShowGenerator(false)}
						onKeyDown={() => setShowGenerator(false)}
						tabIndex={0}
						role="button"
					>
						X
					</span>
					<h2 className="header">Generate Password</h2>
				</div>

				<FormGroup row>
					<LengthLabel component="label">
						Length: {options.length}
					</LengthLabel>

					<LengthSlider
						aria-label="Length label"
						value={options.length}
						min={3}
						max={32}
						name="length"
						onChange={handleSliderChange}
						aria-labelledby="range-slider"
					/>
				</FormGroup>

				<FormGroup row>
					<FormControlLabel
						control={
							<Checkbox
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
							<Checkbox
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
							<Checkbox
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
							<Checkbox
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
							<Checkbox
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
							<Checkbox
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
							<Checkbox
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
							<Checkbox
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
						label="Pronounceable"
					/>
				</FormGroup>

				<FormGroup row className="generated-password">
					<input
						name="password"
						type="text"
						ref={copyRef}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</FormGroup>

				<button
					className="add-task__submit"
					data-testid="add-task"
					type="button"
					onClick={() => handleCopy()}
				>
					Copy
				</button>
				<span
					aria-label="Cancel adding a task"
					className="add-task__cancel"
					data-testid="add-task-main-cancel"
					onClick={() => setShowGenerator(false)}
					onKeyDown={() => setShowGenerator(false)}
					tabIndex={0}
					role="button"
				>
					Close
				</span>
			</div>
		</div>
	) : null;
};

export default Generator;
