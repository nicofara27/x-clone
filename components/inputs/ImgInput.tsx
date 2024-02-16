import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {  ChangeEvent } from "react";

const ImgInput = ({
  form,
  handleMedia,
}: {
  form: any;
  handleMedia: (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => void;
}) => {
  return (
    <FormField
      control={form.control}
      name="media"
      render={({ field }) => (
        <FormItem className="flex items-center">
          <FormLabel className="flex items-center justify-center p-1 rounded-full hover:bg-gray-700 hover:cursor-pointer">
            <Image
              src="/assets/img.svg"
              alt="Fotos y videos"
              width={20}
              height={20}
              className="object-contain"
            />
          </FormLabel>
          <FormControl className="font-semibold text-gray-200">
            <Input
              type="file"
              accept="image/*"
              className=" hidden"
              onChange={(e) => handleMedia(e, field.onChange)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImgInput;
