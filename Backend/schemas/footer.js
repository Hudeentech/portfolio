export default {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Main title or message for the footer.",
    },
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Link Title",
              type: "string",
              description: "Title of the link to be displayed on the page.",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
              description: "The URL the link should navigate to.",
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "url",
            },
          },
        },
      ],
      description: "List of social or contact links with titles and URLs.",
    },
    {
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Text for the call-to-action button.",
    },
  ],
};
