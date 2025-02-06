
export const useDocumentStore = defineStore('documentStore', () => {

    const globalStore = useGlobalDataStore()

    // states
    const docList = ref(null)
    const documentCategories = ref([])
    const previewModalStatus = ref(false)
    const blobDataFile = ref(null)



    // Getters
    const getDocumentList : ComputedRef<[]> = computed(() => {return docList.value})
    const getPreviewModalState : ComputedRef<[]> = computed(() => {return previewModalStatus.value})
    const getDocTypes : ComputedRef<[]> = computed(() => {return documentCategories.value?.data})

    // Actions
    const togglePreviewModalStatus  = (state:boolean) : Boolean =>  previewModalStatus.value = state
    async function retrieveDocuments(per_page: number = 12, page : number = 1, search : string = '') : Promise<[]>{
        globalStore.toggleContentLoaderState(true)
        const {data,error} = await useApiFetch(`/api/documents?per_page=${per_page}&page=${page}&search=${search}`);
        if(data.value){
            // globalStore.assignAlertMessage(data.value.message, 'success')
            docList.value = data.value?.data
            globalStore.toggleContentLoaderState(false)
        }else {
            console.log(error.value)
            globalStore.toggleContentLoaderState(false)
        }
    }
    const uploadNewDocument = async (passedData) : Promise => {
        try {
            const { data, error } = await useApiFetch('/api/upload-document', {
                method: 'POST',
                body: passedData,
                headers: {
                    // 'Content-Type': "multipart/form-data"
                }
            });
            if(data.value){
                const message = 'Document uploaded successfully!';
                await  retrieveDocuments()
                globalStore.toggleBtnLoadingState(false);
                globalStore.assignAlertMessage(message, 'success');
                navigateTo('/profile/documents')
            }
            if(error.value){
                globalStore.toggleBtnLoadingState(false);
                globalStore.assignAlertMessage(error.value?.message, 'error');
            }
        } catch (err) {
            console.log(error)
            const message = 'Failed to upload document.';
            globalStore.toggleBtnLoadingState(false);
            globalStore.assignAlertMessage(message, 'error');
        }
    }
    async function retrieveDocByName(name: string) : Promise {
        globalStore.toggleContentLoaderState(true)
        const { data, error } = await useApiFetch(`/api/document/${name}`);
        if(data.value){
            globalStore.toggleContentLoaderState(false);
            return data.value?.data;
        }
        else {
            globalStore.toggleContentLoaderState(false);
            globalStore.assignAlertMessage(error.value?.data?.message, 'error')
            return null;
        }
    }
    async function deleteDoc(docId : string) : Promise {
        globalStore.toggleContentLoaderState(true)
        const { data, error } = await useApiFetch(`/api/document-delete-${docId}`, {
            method: 'DELETE'
        });
        if(data.value){
            await  retrieveDocuments()
            globalStore.toggleContentLoaderState(false);
        }
        else {
            globalStore.toggleContentLoaderState(false);
            globalStore.assignAlertMessage(error.value?.data?.message, 'error')
        }
    }
    async function updateDocStatus(docId : string) : Promise {
        globalStore.toggleContentLoaderState(true)
        const { data, error } = await useApiFetch(`/api/document-update-${docId}`, {
            method: 'PUT'
        });
        if(data.value){
            await  retrieveDocuments()
            globalStore.toggleContentLoaderState(false);
        }
        else {
            globalStore.toggleContentLoaderState(false);
            globalStore.assignAlertMessage(error.value?.data?.message, 'error')
        }
    }

    // Document types Functions
    async function retrieveDocumentTypes() : Promise<[]>{
        const {data,error} = await useApiFetch(`/api/document-types`);
        if(data.value){
            documentCategories.value = data.value;
        }if(error.value) {
            globalStore.handleApiError(error.value)
        }
    }
    async function createUpdateDocumentType(passed_data: object) : Promise <void>{
        globalStore.toggleBtnLoadingState(true)
        const action = passed_data?.action
        const {data, error} = await useApiFetch(`/api/admin/${action}-document-type`,{
            method: action === 'create' ? 'POST': 'PATCH',
            body : passed_data
        });
        if(data.value?.success){
            globalStore.toggleBtnLoadingState(false)
            globalStore.assignAlertMessage(data.value?.message,'success')
            await retrieveDocumentTypes()
        }
        else {
            globalStore.handleApiError(error.value);
        }
    }
    async function deleteDocType(docTypeId : string) : Promise {
        globalStore.toggleContentLoaderState(true)
        const { data, error } = await useApiFetch(`/api/admin/delete-document-type/${docTypeId}`, {
            method: 'DELETE'
        });
        if(data.value?.success){
            await  retrieveDocumentTypes()
            globalStore.toggleContentLoaderState(false);
            globalStore.assignAlertMessage(data.value?.message, 'success')
        }
        else {
            globalStore.toggleContentLoaderState(false);
            globalStore.assignAlertMessage(error.value?.data?.message, 'error')
        }
    }

    // Function to initiate the download of users' Excel file
    const handleExcelFileExport = async (file_type:string, file_name:string = 'simple_exported_file' ): Promise<void> => {
        globalStore.toggleContentLoaderState(true)
        const returned_file_path = ref('')
        try {
            const { data, error } = await useApiFetch(`/api/admin/export-${file_type}-report`, {
                accept: "application/json",
            });
            returned_file_path.value = data.value?.path;
            globalStore.toggleContentLoaderState(false)
            if (!returned_file_path.value) {
                throw new Error('File path not received');
            }
        } catch (error) {
            console.error('Error downloading file:', error);
        }
        if (returned_file_path.value !=''){
            await downloadStoredFile(returned_file_path.value, file_name);
        }else {
            console.log('No file path returned')
        }
    };

// Function to download a file given its path
    const downloadStoredFile = async (pass_path: string, file_name: string = "file") : Promise => {
        globalStore.toggleContentLoaderState(true)
        const { data, error } = await useApiFetch(`/api/admin/file-preview?name=${encodeURIComponent(pass_path)}`, {
            'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // Set to Excel MIME type
        });
        if (data.value) {
            const blob = new Blob([data.value],
                { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Set blob type to Excel
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${file_name}-file.xlsx`); // Change the file extension to .xlsx
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the URL object
            URL.revokeObjectURL(url);
            globalStore.toggleContentLoaderState(false)
            globalStore.assignAlertMessage('File Downloaded', 'success')
        }
        if (error.value) {
            console.log(error.value);
            globalStore.toggleBtnLoadingState(false)
            globalStore.assignAlertMessage(error.value?.message, 'error')
        }
    };




    return {
        getDocumentList,getDocTypes,
        togglePreviewModalStatus, getPreviewModalState,
        retrieveDocuments,
        retrieveDocByName,deleteDoc,
        updateDocStatus,uploadNewDocument,
        retrieveDocumentTypes, createUpdateDocumentType,
        deleteDocType,
        handleExcelFileExport,
    }
})