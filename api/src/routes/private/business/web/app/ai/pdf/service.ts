import config from "@/config";
import { sanitizePath } from "@/utils/path";
import { requestPath } from "@/utils/response";
import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import FileType from 'file-type';
import { Upload } from "@aws-sdk/lib-storage";


type Opts<T> = T;




class Services_privateBusinessWebAppAIPdf {

    private async promptIaGenerate() {
    
        class OpenAI {

        }
        class Grok {
            
        }
    
    }

    public async generatePDF(request: FastifyRequest, reply: FastifyReply, opts: Opts<{ nameFile: string }>) {

    };


};

export default new Services_privateBusinessWebAppAIPdf();