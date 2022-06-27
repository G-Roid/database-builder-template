document.querySelector('#updateButton').addEventListener('click', updateEntry)
document.querySelector('#deleteButton').addEventListener('click', deleteEntry)


async function deleteEntry() {
    console.log('gone')
    const input = document.getElementById('deleteInput')
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: input.value
            })
        })
        const data = await response.json()
        location.reload()

    } catch(err) {
        console.log(err)
    }
}

async function updateEntry(){
    console.log('thinsg got updated')
    try{
        const response = await fetch('updateEntry', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: document.getElementsByName("name")[0].value,
            speciesName: document.getElementsByName("speciesName")[0].value,
            features: document.getElementsByName("features")[0].value,
            homeworld: document.getElementsByName("homeworld")[0].value,
            image: document.getElementsByName("image")[0].value,
            interestingFact: document.getElementsByName("interestingFact")[0].value,
            notableExamples: document.getElementsByName("notableExamples")[0].value
        })
    })
    const data = await response.json()
    console.log(data)
    location.reload()

    }catch(err){
        console.log(err)
    }
}