import { ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";

export default function HomeImageList() {
  const itemData = [
    {
      img: "/images/bags-2.jpg",
      title: "Breakfast",
    },
    {
      img: "/images/bags-4.jpg",
      title: "Burger",
    },
    {
      img: "/images/bags-3.jpg",
      title: "Camera",
    },
  ];

  return (
    <ImageList cols={3}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <Image
            src={item.img}
            alt={item.title}
            loading="lazy"
            width={400}
            height={400}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
