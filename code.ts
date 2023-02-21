figma.showUI(__html__);
figma.ui.resize(500, 500);
figma.ui.onmessage = async (pluginMessage) => {
  const { name, username, description, darkModeState, imageVariant } =
    pluginMessage;
  const postComponentSet = figma.root.findOne(
    (node) => node.type == "COMPONENT_SET" && node.name == "post"
  ) as ComponentSetNode;
  console.log(imageVariant);
  let selectedVariant;
  if (darkModeState) {
    switch (imageVariant) {
      case "2":
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=single, Dark mode=true"
        ) as ComponentNode;
        break;
      case "3":
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=carousel, Dark mode=true"
        ) as ComponentNode;
        break;
      default:
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=none, Dark mode=true"
        ) as ComponentNode;
        break;
    }
  } else {
    switch (imageVariant) {
      case "2":
        console.log(1);
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=single, Dark mode=false"
        ) as ComponentNode;
        break;
      case "3":
        console.log(1);
        selectedVariant = postComponentSet.findOne(
          (node) =>
            node.type == "COMPONENT" &&
            node.name == "Image=carousel, Dark mode=false"
        ) as ComponentNode;
        break;
      default:
        console.log(1);
        selectedVariant = postComponentSet.defaultVariant as ComponentNode;
        break;
    }
  }
  console.log(selectedVariant);
  const newPost = selectedVariant?.createInstance();

  const templateName = newPost.findOne(
    (node) => node.type == "TEXT" && node.name == "displayName"
  ) as TextNode;
  const templateUsername = newPost.findOne(
    (node) => node.type == "TEXT" && node.name == "@username"
  ) as TextNode;
  const templateDescription = newPost.findOne(
    (node) => node.type == "TEXT" && node.name == "description"
  ) as TextNode;
  await figma.loadFontAsync({ family: "Rubik", style: "Regular" })
  templateName.characters = name;
  templateUsername.characters = username;
  templateDescription.characters = description;

  figma.viewport.scrollAndZoomIntoView([newPost])
  figma.closePlugin();
};
