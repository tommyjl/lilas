import React from "react";

interface ShowcaseItem {
  title: string;
  href: string;
}

export function Menu() {
  const showcaseItems: Array<ShowcaseItem> = [
    {
      title: "Button",
      href: "button.html",
    },
    {
      title: "Link",
      href: "link.html",
    },
    {
      title: "Heading",
      href: "heading.html",
    },
  ];

  return (
    <div className="lilas-menu">
      <h1>Lilas</h1>
      <ul>
        {showcaseItems.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
