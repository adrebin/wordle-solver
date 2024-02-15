import './Row.css';
import React, { useState } from 'react';

function Row(props) {
	const [formData, setFormData] = useState({
		one: "",
		color1: "gray",
		two: "",
		color2: "gray",
		three: "",
		color3: "gray",
		four: "",
		color4: "gray",
		five: "",
		color5: "gray",
	});

	const COLOR_WHEEL = ["gray", "yellow", "green"];

	const rotateColor = (current) => {
		const index = COLOR_WHEEL.indexOf(current);
		switch (index) {
			case 0:
				return COLOR_WHEEL[1];
			case 1:
				return COLOR_WHEEL[2];
			case 2:
				return COLOR_WHEEL[0];
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		const formattedData = {
			1: {
				value: formData.one.toLowerCase(),
				color: formData.color1,
			},
			2: {
				value: formData.two.toLowerCase(),
				color: formData.color2,
			},
			3: {
				value: formData.three.toLowerCase(),
				color: formData.color3,
			},
			4: {
				value: formData.four.toLowerCase(),
				color: formData.color4,
			},
			5: {
				value: formData.five.toLowerCase(),
				color: formData.color5,
			},
		}

		props.setRowData(props.rowNum, formattedData);
	}

	const handleOnChange = (e, name) => {
		setFormData({ ...formData, [name]: e.target.value.toUpperCase() });
	}

	return (
		<form className="row" onSubmit={handleSubmit} autoComplete="off">
			<input type="text" name="one" className={formData.color1} onChange={(e) => handleOnChange(e, 'one')} value={formData.one} />
			<input type="button" name="color1" onClick={() => setFormData({ ...formData, color1: rotateColor(formData.color1) })} />

			<input type="text" name="two" className={formData.color2} onChange={(e) => handleOnChange(e, 'two')} value={formData.two} />
			<input type="button" name="color2" onClick={() => setFormData({ ...formData, color2: rotateColor(formData.color2) })} />

			<input type="text" name="three" className={formData.color3} onChange={(e) => handleOnChange(e, 'three')} value={formData.three} />
			<input type="button" name="color3" onClick={() => setFormData({ ...formData, color3: rotateColor(formData.color3) })} />

			<input type="text" name="four" className={formData.color4} onChange={(e) => handleOnChange(e, 'four')} value={formData.four} />
			<input type="button" name="color4" onClick={() => setFormData({ ...formData, color4: rotateColor(formData.color4) })} />

			<input type="text" name="five" className={formData.color5} onChange={(e) => handleOnChange(e, 'five')} value={formData.five} />
			<input type="button" name="color5" onClick={() => setFormData({ ...formData, color5: rotateColor(formData.color5) })} />

			<input type="submit" value="Submit" />
		</form>
	);
}

export default Row;
