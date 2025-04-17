import "../App.css";
import { Button, Card, MenuItem, Select } from "@mui/material";

interface searchBarProps {
	data: any;
	year: string;
	month: string;
	setYear: (year: string) => void;
	setMonth: (month: string) => void;
}

export default function SearchBar({
	data,
	year,
	month,
	setYear,
	setMonth,
}: searchBarProps) {
	const years = Object.keys(data).map((year) => year);
	const months = Object.keys(data[year]);

	return (
		<Card
			className="search-bar"
			sx={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
		>
			<Select
				name="month"
				value={month}
				onChange={(e) => setMonth(e.target.value)}
				sx={{ width: "130px", textAlign: "left" }}
			>
				{months.map((month) => (
					<MenuItem key={month} value={month}>
						{month}
					</MenuItem>
				))}
			</Select>
			<Select
				name="year"
				value={year}
				onChange={(e) => setYear(e.target.value)}
			>
				{years.map((year) => (
					<MenuItem key={year} value={year}>
						{year}
					</MenuItem>
				))}
			</Select>
			<Button variant="contained" style={{ marginLeft: "auto" }}>
				Search
			</Button>
		</Card>
	);
}
