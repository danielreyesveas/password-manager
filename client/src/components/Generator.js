import { useEffect, useState } from "react";
import { useUI } from "../context";
import { PasswordGenerator, CharRanges } from "../utils/generator";

const Generator = ({ groups, selectedGroup, addPassword }) => {
	const [length, setLength] = useState(3);
	const { showGenerator, setShowGenerator } = useUI();

	const handleGenerate = () => {
		console.log(length);
		const opt = {
			length,
			name: "Pronounceable",
		};
		console.log(opt);
		const pass = PasswordGenerator.generate(opt);
		console.log(pass);
	};

	useEffect(() => {
		handleGenerate();
	}, [length]);

	return showGenerator ? (
		<div className="add-task add-task__overlay" data-testid="add-task-comp">
			<div className="add-task__main" data-testid="add-task-main">
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

				<label>Length:</label>
				<input
					aria-label="Enter the length"
					className="add-task__name"
					data-testid="add-task-content"
					type="number"
					value={length}
					onChange={(e) => setLength(Number(e.target.value))}
				/>

				<button
					className="add-task__submit"
					data-testid="add-task"
					type="button"
					onClick={() => handleGenerate()}
				>
					Password
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
					Cancel
				</span>
			</div>
		</div>
	) : null;
};

export default Generator;
