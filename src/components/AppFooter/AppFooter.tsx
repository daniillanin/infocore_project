import styled from "styled-components"

const FooterWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 40px;
    background-color: rgb(229, 231, 235);
    border: 1px solid rgb(229, 231, 235);
    border-radius: 6px;
`

export function AppFooter() {
    return (
        <FooterWrapper>
            <p>позже здесь будет функционал</p>
        </FooterWrapper>
    )
}