import Quill from 'quill';
import { forwardRef, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ImageResize from 'quill-image-resize';

const Container = styled.div`
    .ql-editor img {
        max-width: 100%;
    }
`;

Quill.register('modules/imageResize', ImageResize);

const Editor = forwardRef((props, ref) => {
    const { content, onChangeText, isEdit, newFileList, onFileUpload, fileListUpdate } = props;

    const quillElement = useRef();
    const quillInstance = ref;

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'snow',
            placeholder: '내용을 작성하세요...',
            modules: {
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
                imageResize: {},
            },
        });

        const quill = quillInstance.current;
        const toolbar = quill.getModule('toolbar');
        toolbar.addHandler('image', () => {
            const container = quillElement.current;
            let input = container.querySelector('input[type=file]');
            if (!input) {
                input = document.createElement('input');
                input.style = 'display:none';
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.setAttribute('multiple', 'true');
                input.onchange = () => {
                    const files = input.files;
                    if (input.value.length != 0) {
                        const formData = new FormData();
                        Array.apply(null, input.files).forEach((item) => {
                            formData.append('files', item);
                        });
                        onFileUpload(formData);
                    }

                    input.remove();
                };
                quillElement.current.appendChild(input);
            }
            input.click();
        });

        quill.root.innerHTML = content || '';
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source == 'user') {
                onChangeText({ key: 'content', value: quill.root.innerHTML });
            }
        });
    }, []);

    useEffect(() => {
        const quill = quillInstance.current;
        if (quill) {
            if (newFileList) {
                newFileList.map((item) => {
                    const src = `/api/upload/files/${item}`;
                    const delta = quill.insertEmbed(quill.getSelection(), 'image', src, 'user');
                });
            }
        }
    }, [newFileList]);
    return (
        <>
            <Container ref={quillElement}></Container>
        </>
    );
});

export default Editor;
