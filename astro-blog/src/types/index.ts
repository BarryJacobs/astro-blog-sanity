import type {
  TypedObject,
  PortableTextBlock,
  ArbitraryTypedObject,
} from "@portabletext/types";

export type PortableTextValue<
  Value extends TypedObject = PortableTextBlock | ArbitraryTypedObject,
> = Value;
