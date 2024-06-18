import os
import streamlit.components.v1 as components

_RELEASE = False

if not _RELEASE:
    _component_func = components.declare_component(
        "streamlit_gallery",
        url="http://localhost:3001",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/build")
    _component_func = components.declare_component("streamlit_gallery", path=build_dir)


def streamlit_gallery(images, max_width=400, gap=4, max_cols=2, max_rows=2, key=None):
    """Create a new instance of "streamlit_gallery".

    The Gallery shows a grid of images. Images can be opened in a separate tab.

    Parameters
    ----------
    images: list of dict
        Image dictionaries: `{ 'src': 'image_url', 'title': 'Example Title' }`
    max_width: int or str
        Maximum width of the gallery.
    gap: int
        Gap between the images.
    max_cols: int
        maximum number of columns.
    max_rows: int
        maximum number of rows.
    key: str or None
        An optional key that uniquely identifies this component. If this is
        None, and the component's arguments are changed, the component will
        be re-mounted in the Streamlit frontend and lose its current state.
    """
    _component_func(
        images=images,
        max_width=max_width,
        gap=gap,
        max_cols=max_cols,
        max_rows=max_rows,
        key=key
    )
