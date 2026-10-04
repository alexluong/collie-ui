import {
  Button,
  Dialog,
  DialogClose,
  DialogPanel,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerPanel,
  DrawerTrigger,
  Inline,
  SelectField,
  Stack,
  Text,
  TextField,
} from "@collie/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = { title: "Primitives/Overlays" } satisfies Meta;
export default meta;

export const DialogSizes: StoryObj = {
  render: () => (
    <Inline space="100">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Dialog key={size}>
          <DialogTrigger
            render={<Button emphasis="secondary" tone="neutral" children={`Open ${size}`} />}
          />
          <DialogPanel
            size={size}
            title={`A ${size} dialog`}
            description="Base UI owns focus, escape and scroll locking. The recipe owns every pixel."
            footer={
              <>
                <DialogClose
                  render={<Button emphasis="tertiary" tone="neutral" children="Cancel" />}
                />
                <DialogClose render={<Button children="Confirm" />} />
              </>
            }
          >
            <Text tone="muted">
              The panel is portalled to the document body, so the theme has to live on the document
              root rather than a wrapper element.
            </Text>
          </DialogPanel>
        </Dialog>
      ))}
    </Inline>
  ),
};

export const DestructiveDialog: StoryObj = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button tone="critical" children="Delete workspace" />} />
      <DialogPanel
        size="sm"
        title="Delete this workspace?"
        description="Every order, member and invoice goes with it. This cannot be undone."
        footer={
          <>
            <DialogClose render={<Button emphasis="tertiary" tone="neutral" children="Cancel" />} />
            <DialogClose render={<Button tone="critical" children="Delete workspace" />} />
          </>
        }
      >
        <TextField label="Type the workspace name to confirm" placeholder="Northwind Ltd" />
      </DialogPanel>
    </Dialog>
  ),
};

export const SidePanel: StoryObj = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button children="Open drawer" />} />
      <DrawerPanel
        title="Edit tenant"
        description="Changes apply the moment you save."
        footer={
          <>
            <DrawerClose render={<Button emphasis="tertiary" tone="neutral" children="Cancel" />} />
            <DrawerClose render={<Button children="Save" />} />
          </>
        }
      >
        <Stack space="200">
          <TextField label="Company name" defaultValue="Northwind Ltd" />
          <TextField label="Owner email" defaultValue="marisol@northwind.com" />
          <SelectField
            label="Plan"
            defaultValue="scale"
            options={[
              { value: "starter", label: "Starter" },
              { value: "growth", label: "Growth" },
              { value: "scale", label: "Scale" },
            ]}
          />
        </Stack>
      </DrawerPanel>
    </Drawer>
  ),
};
