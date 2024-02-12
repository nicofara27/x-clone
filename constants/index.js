export const menuLinks = [
  {
    nombre: "Inicio",
    url: "/",
    logo: "/assets/home.svg",
  },
  {
    nombre: "Explorar",
    url: "/explore",
    logo: "/assets/search.svg",
  },
  {
    nombre: "Notificaciones",
    url: "/notifications",
    logo: "/assets/bell.svg",
  },
  {
    nombre: "Listas",
    url: "/listas",
    logo: "/assets/list.svg",
  },
  {
    nombre: "Perfil",
    url: "/profile",
    logo: "/assets/user.svg",
  },
];

export const profileTabs = [
  { value: "posts", label: "Posts" },
  { value: "replies", label: "Respuestas" },
  { value: "media", label: "Fotos y videos" },
  { value: "likes", label: "Me gusta" },
];

export const postStats = [
  {
    title: "Impresiones",
    description: "Cantidad de veces que este post se vio en X-Clone",
  },
  {
    title: "Interacciones",
    description:
      "Número total de veces que un usuario interactuó con un post. Esto incluye todos los clics en cualquier parte del post (por ejemplo, hashtags, enlaces, avatar, nombre de usuario y expansión del post), así como los reposts, las respuestas, los nuevos seguidores y los Me gusta.",
  },
  {
    title: "Ampliaciones de detalles",
    description: "Cantidad de veces que se vieron los detalles sobre este post",
  },
];

export const postMediaTypes = [
  {
    name: "media",
    icon: "/assets/img.svg",
    alt: "Fotos y videos",
  },
  {
    name: "gif",
    icon: "/assets/gif.svg",
    alt: "GIF",
  },
  {
    name: "emoji",
    icon: "/assets/emoji.svg",
    alt: "Emoji",
  },
];
