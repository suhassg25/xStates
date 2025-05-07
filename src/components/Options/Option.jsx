
function Options({name, countries, isSelected, handler}){
const handleChange = (e)=>{
    handler(e.target.id, e.currentTarget.value);
}

return(
    <div style={{padding: "5px"}}>

    <select id={name} onChange={handleChange} disabled={isSelected} >
        <option value="">{`Select ${name}`}</option>
        {countries.map((item) => {
            return <option key={item} value={item}>{item}</option>
        })}
    </select>
        </div>

)


}

export default Options;