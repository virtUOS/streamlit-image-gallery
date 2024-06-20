import {
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib";
import React, { ReactNode } from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";

interface Image {
  src: string,
  title: string
}

class StreamlitGallery extends StreamlitComponentBase {
  private imageListElement: HTMLUListElement | null | undefined;

  // Arguments that are passed to the plugin in Python are accessible
  // via `this.props.args`.
  private images: Image[] = this.props.args["images"];

  private maxWidth = this.props.args["max_width"] ?? 400;

  private gap = this.props.args["gap"] ?? 4;

  private maxCols = this.props.args["max_cols"] ?? 2;
  private maxRows = this.props.args["max_rows"] ?? 2;

  public render = (): ReactNode => {
    const numberImages = this.images.length;

    const imageListWidth = this.imageListElement?.clientWidth ?? 0;
    const height = numberImages === 2 ? imageListWidth / 2 : imageListWidth;

    const cols = Math.min(numberImages, this.maxCols);
    const rows = Math.min(Math.ceil(numberImages / cols), this.maxRows);

    const rowGaps = (rows - 1) * this.gap;
    const rowHeight = (height - rowGaps) / rows;

    return (
      <ImageList
          sx={{ maxWidth: this.maxWidth, height: height }}
          cols={cols}
          rowHeight={rowHeight}
          gap={this.gap}
          ref={ (imageListElement) => { this.imageListElement = imageListElement } }
      >
        {this.images.map((image) => (
          <ImageListItem
              key={image.src}
              sx={{ overflow: 'hidden', justifyContent: 'center' }}
          >
            <img
              src={image.src}
              alt={image.title}
              onClick={this.openImage}
              style={{ cursor: "pointer" }}
              loading="lazy"
            />
            <ImageListItemBar title={image.title} />
          </ImageListItem>
        ))}
      </ImageList>
    )
  }

  private openImage = (event: React.MouseEvent<HTMLImageElement>) => {
    const img = event.currentTarget;

    if (img.src.startsWith('data:image')) {
      // Handle data urls with base64 encoded data
      const image = new Image();
      image.src = img.src;

      const w = window.open("", '_blank');
      w!.document.body.innerHTML = image.outerHTML;
    } else {
      window.open(img.src, '_blank');
    }
  }
}

export default withStreamlitConnection(StreamlitGallery);
