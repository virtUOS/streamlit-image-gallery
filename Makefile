start:
	streamlit run streamlit_image_gallery/example.py

# Note: Check release flag in __init__.py
build: frontend_build
	python setup.py sdist bdist_wheel

frontend_build:
	cd streamlit_image_gallery/frontend && npm run build

publish: build
	python -m twine upload dist/*

clean:
	rm -r build streamlit_image_gallery/frontend/build
