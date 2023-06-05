import Quill from 'quill';
import { useEffect, useRef } from 'react';

const Editor = ({ reviewData, onChangeText, isEdit, newFileList, onFileUpload, fileListUpdate }) => {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

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

        quill.root.innerHTML = reviewData.content || '';
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
                    quill.insertEmbed(quill.getSelection(), 'image', `/api/upload/files/${item}`, 'user');
                });
            }
            const elements = quill.root.querySelectorAll('img');
            if (elements.length != 0) {
                const list = Array.from(elements).map((item) => item.src.split('/').pop());
                fileListUpdate(list);
            }
        }
    }, [newFileList]);

    return (
        <>
            <div ref={quillElement}></div>
        </>
    );
};

export default Editor;
