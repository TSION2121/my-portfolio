import styled from 'styled-components';

export const PdfContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 141.4%; 
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    iframe, object {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }
`;