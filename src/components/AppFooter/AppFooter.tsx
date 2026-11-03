import styled from "styled-components"

const FooterWrapper = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    height: 40px;
    font-width: 200;
    background-color: rgb(229, 231, 235);
    border: 1px solid rgb(229, 231, 235);
    border-radius: 6px;
`
const FooterButton = styled.button`
    height: 100%;
    font-width: 200;
    background-color: transparent;
    border: none;
    &:hover {
        cursor: pointer
    }
    &:nth-child(odd) {
        margin-right: 10px
    }
    span {
        margin-left: 5px
    }
`
export function AppFooter() {
    return (
        <FooterWrapper>
            <FooterButton className="pi pi-bookmark">
                <span>Избранное</span>
            </FooterButton>
            <FooterButton className="pi pi-book">
                <span>Архив</span>
            </FooterButton>
        </FooterWrapper>
    )
}