import Card from "./Card"

const Cards = (props) => {
    let len = props.items.length;
    const passArticleLink = (enteredLink) => {
        props.onPassArticleLink(enteredLink);
    }
    const passReRender = (enteredBool) => {
        props.onPassReRender(enteredBool);
    }
    // console.log(props.items);
    return (
        props.items.length>0?
            props.items.map((item, index) => { return <Card key={index} items={item} selectedFolder={props.selectedFolder} onPassReRender={passReRender} onPassArticleLink={passArticleLink} /> })
            : <p className="noDiary">No diary</p>
    )
}

export default Cards;