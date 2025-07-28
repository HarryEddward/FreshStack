// plugins/seaweed.ts
import fp from 'fastify-plugin'
import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'

export default fp(async function (fastify) {
  const seaweedMaster = process.env.SEAWEED_MASTER_URL || 'http://seaweedfs-master:9333'

  // Subir archivo
  fastify.decorate('uploadFile', async (filePath: string) => {
    const { data: { fid, publicUrl } } = await axios.get(`${seaweedMaster}/dir/assign`)

    const form = new FormData()
    form.append('file', fs.createReadStream(filePath))

    const uploadURL = `http://${publicUrl}/${fid}`
    await axios.post(uploadURL, form, { headers: form.getHeaders() })

    return { fid, url: uploadURL }
  })

  // Descargar archivo
  fastify.decorate('getFileURL', (fid: string) => {
    return `${seaweedMaster}/get/${fid}`
  })
})
