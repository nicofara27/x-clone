import Image from "next/image";
import Picker from "../Picker";
import {
  Categories,
  EmojiStyle,
  Theme,
  EmojiClickData,
  SuggestionMode,
} from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const EmojiPicker = () => {
  const emojiCategories = [
    {
      name: "Recientes",
      category: Categories.SUGGESTED,
    },
    {
      name: "Emoticonos y personas",
      category: Categories.SMILEYS_PEOPLE,
    },
    {
      name: "Animales y naturaleza",
      category: Categories.ANIMALS_NATURE,
    },
    {
      name: "Comida y bebida",
      category: Categories.FOOD_DRINK,
    },
    {
      name: "Actividad",
      category: Categories.ACTIVITIES,
    },
    {
      name: "Viajes y lugares",
      category: Categories.TRAVEL_PLACES,
    },
    {
      name: "Objetos",
      category: Categories.OBJECTS,
    },
    {
      name: "Símbolos",
      category: Categories.SYMBOLS,
    },
    {
      name: "Banderas",
      category: Categories.FLAGS,
    },
  ];

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log(emojiData);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded-full p-1 hover:bg-gray-700 hover:cursor-pointer">
          <Image src="/assets/smile.svg" alt="emoji" width={20} height={20} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-100 bg-transparent border-none">
        <Picker
          onEmojiClick={onEmojiClick}
          autoFocusSearch={true}
          lazyLoadEmojis={true}
          emojiStyle={EmojiStyle.TWITTER}
          theme={Theme.DARK}
          previewConfig={{ defaultCaption: "", defaultEmoji: "1f44b" }}
          suggestedEmojisMode={SuggestionMode.RECENT}
          categories={emojiCategories}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;