import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dashboard } from "./dashboard.js";
import { Integrations } from "./integrations.js";
import { OrderList } from "./order-list.js";
import { SettingsPage } from "./settings-page.js";
import { TenantDetail } from "./tenant-detail.js";
import { TenantList } from "./tenant-list.js";

const meta = {
  title: "POC/Screens",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

export const DashboardScreen: StoryObj = { name: "Dashboard", render: () => <Dashboard /> };
export const Tenants: StoryObj = { name: "Tenant list", render: () => <TenantList /> };
export const Tenant: StoryObj = { name: "Tenant detail", render: () => <TenantDetail /> };
export const IntegrationsScreen: StoryObj = {
  name: "Integrations",
  render: () => <Integrations />,
};
export const Settings: StoryObj = { render: () => <SettingsPage /> };
export const Orders: StoryObj = { render: () => <OrderList /> };
export const OrdersEmpty: StoryObj = { name: "Orders (empty)", render: () => <OrderList empty /> };
