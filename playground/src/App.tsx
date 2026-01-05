import { useState } from "react";
import { Shell } from "@plcl/ui";
import {
	useTheme,
	Button,
	Card,
	Input,
	Textarea,
	Select,
	Checkbox,
	Switch,
	Slider,
	Radio,
	Avatar,
	Alert,
	Progress,
	Loading,
	Modal,
	Drawer,
	Accordion,
	Text,
	Title,
	Stack,
	Group,
	Container,
	Divider,
	Tooltip,
	SegmentedControl,
} from "@plcl/core";
import { IconPalette, IconSun, IconMoon, IconDeviceDesktop } from "@tabler/icons-react";

function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	return (
		<SegmentedControl
			value={theme}
			onChange={(value) => setTheme(value as "light" | "dark" | "system")}
			data={[
				{ label: <IconSun size={16} />, value: "light" },
				{ label: <IconMoon size={16} />, value: "dark" },
				{ label: <IconDeviceDesktop size={16} />, value: "system" },
			]}
		/>
	);
}

function PlaygroundContent() {
	const [modalOpen, setModalOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [sliderValue, setSliderValue] = useState(50);
	const [checked, setChecked] = useState(false);
	const [switchOn, setSwitchOn] = useState(true);
	const [radioValue, setRadioValue] = useState("1");

	return (
		<Container size="xl" style={{ padding: "2rem" }}>
			<Stack gap="xl">
				<Group gap="lg">
					<div style={{ flex: 1 }}>
						<Title order={1}>PLC Playground</Title>
						<Text>Interactive testing environment for PLC components</Text>
					</div>
					<ThemeToggle />
				</Group>

				<Divider />

				{/* Buttons Section */}
				<Card>
					<Stack gap="md">
						<Title order={2}>Buttons</Title>
						<Group gap="md">
							<Button>Default</Button>
							<Button variant="glass-highlight">Highlighted</Button>
							<Button variant="outline">Outline</Button>
							<Button variant="text">Text</Button>
							<Button variant="icon"><IconPalette size={20} /></Button>
						</Group>
					</Stack>
				</Card>

				{/* Inputs Section */}
				<Card>
					<Stack gap="md">
						<Title order={2}>Inputs</Title>
						<Stack gap="sm">
							<Input placeholder="Text input..." />
							<Textarea placeholder="Textarea..." />
						<Select
							data={[
								{ label: "Option 1", value: "1" },
								{ label: "Option 2", value: "2" },
								{ label: "Option 3", value: "3" },
							]}
						/>
						</Stack>
						<Group gap="lg">
							<Checkbox
								label="Checkbox"
								checked={checked}
								onChange={(e) => setChecked(e.target.checked)}
							/>
							<Switch
								label="Switch"
								checked={switchOn}
								onChange={(e) => setSwitchOn(e.target.checked)}
							/>
						</Group>
						<Stack gap="xs">
							<Text size="sm">Slider: {sliderValue}</Text>
							<Slider
								value={sliderValue}
								onChange={(e) => setSliderValue(Number(e.target.value))}
								min={0}
								max={100}
							/>
						</Stack>
						<Group gap="md">
							<Radio
								name="radio-group"
								value="1"
								label="Option 1"
								checked={radioValue === "1"}
								onChange={() => setRadioValue("1")}
							/>
							<Radio
								name="radio-group"
								value="2"
								label="Option 2"
								checked={radioValue === "2"}
								onChange={() => setRadioValue("2")}
							/>
						</Group>
					</Stack>
				</Card>

				{/* Feedback Section */}
				<Card>
					<Stack gap="md">
						<Title order={2}>Feedback</Title>
						<Alert title="Information">This is an alert message.</Alert>
						<Stack gap="xs">
							<Text size="sm">Progress</Text>
							<Progress value={65} />
						</Stack>
						<Group gap="md">
							<Loading />
							<Text size="sm">Loading spinner</Text>
						</Group>
					</Stack>
				</Card>

				{/* Data Display Section */}
				<Card>
					<Stack gap="md">
						<Title order={2}>Data Display</Title>
						<Group gap="md">
							<Avatar />
							<Avatar src="https://i.pravatar.cc/150" />
						</Group>
						<Accordion>
							<Accordion.Item value="item-1">
								<Accordion.Control>Section 1</Accordion.Control>
								<Accordion.Panel>Content for section 1.</Accordion.Panel>
							</Accordion.Item>
							<Accordion.Item value="item-2">
								<Accordion.Control>Section 2</Accordion.Control>
								<Accordion.Panel>Content for section 2.</Accordion.Panel>
							</Accordion.Item>
						</Accordion>
					</Stack>
				</Card>

				{/* Overlays Section */}
				<Card>
					<Stack gap="md">
						<Title order={2}>Overlays</Title>
						<Group gap="md">
							<Button onClick={() => setModalOpen(true)}>Open Modal</Button>
							<Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
							<Tooltip label="This is a tooltip">
								<Button>Hover for Tooltip</Button>
							</Tooltip>
						</Group>
					</Stack>
				</Card>

				<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
					<Stack gap="md">
						<Title order={3}>Example Modal</Title>
						<Text>This is modal content.</Text>
						<Button onClick={() => setModalOpen(false)}>Close</Button>
					</Stack>
				</Modal>

				<Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Example Drawer">
					<Stack gap="md">
						<Text>This is drawer content.</Text>
						<Button onClick={() => setDrawerOpen(false)}>Close</Button>
					</Stack>
				</Drawer>
			</Stack>
		</Container>
	);
}

function Header() {
	return (
		<Group gap="sm" style={{ padding: "0 1rem" }}>
			<IconPalette size={24} />
			<Title order={4}>PLC Playground</Title>
		</Group>
	);
}

export default function App() {
  return (
		<Shell variant="app" header={<Header />}>
			<PlaygroundContent />
		</Shell>
  );
}
