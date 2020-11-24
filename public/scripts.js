const Mask = {
    apply(input, func) {

        setTimeout(function() {

           input.value = Mask[func](input.value)

        }, 1)
    },
    formatCAD(value) { 

        value = value.replace(/\D/g, "")

        return new Intl.NumberFormat("en-CA", {
            style: 'currency',
            currency: 'CAD'

        }).format(value/100)
    }
}



const PhotosUpload = {

    input: "",
    preview:  document.querySelector("#photos-preview"),
    uploadLimit: 6,
    files: [],
    
    handleFileInput(event) {

        const { files: fileList } = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return
 
        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

            PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {

        const { uploadLimit, input, preview } = PhotosUpload
        const { files: fileList } = input

        if(fileList.length > uploadLimit) {
            
            alert(`Maximum upload ${uploadLimit} photos`)

            event.preventDefault()

            return true
        }

        const photosDiv = []

        preview.childNodes.forEach(item => {

            if(item.classList && item.classList.value == "photo")

            photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length

            if(totalPhotos > uploadLimit) {
                alert("Maximum photos limit")
                event.preventDefault()
                return true
            }

        return false

    },
    getAllFiles() {

        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files

    },
    getContainer(image) {

        const div = document.createElement("div")
        div.classList.add("photo")

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {

        const button = document.createElement("i")

        button.classList.add("material-icons")

        button.innerHTML = "close"

        return button
    },
    removePhoto(event) {

        const photoDiv = event.target.parentNode

        const photosArray = Array.from(PhotosUpload.preview.children)

        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)

        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()

    }
}





















/* const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems) {

    if(currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}


function paginate (selectedPage, totalPages) {
    
        let pages = [], oldPage;

        for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pageAfterSelectedPage =  currentPage <= selectedPage + 2
        const pageBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pageBeforeSelectedPage && pageAfterSelectedPage) {

                if(oldPage && currentPage - oldPage > 2) {
                    pages.push("...")
                }

                if(oldPage && currentPage - oldPage == 2) {
                    pages.push(oldPage + 1)
                }

                pages.push(currentPage)
                oldPage = currentPage
            }
        }
        return pages
}

function createPagination (pagination) {

        const filter = pagination.dataset.filter;
        const page = +pagination.dataset.page;
        const total = +pagination.dataset.total;
        const pages = paginate(page, total)

        console.log(pages)

        let elements = ""

        for (let page of pages) {
            
            if(String(page).includes("...")) {

                elements += `<span>${page}</span>`

            } else {

                if(filter) {
                    elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
                } else {
                    elements += `<a href="?page=${page}">${page}</a>`
                }   
            }
        }

        pagination.innerHTML = elements

}

const pagination = document.querySelector(".pagination")



if(pagination) {
    createPagination(pagination)
} */