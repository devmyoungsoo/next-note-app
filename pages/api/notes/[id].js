import dbConnect from "../../../utils/dbConnect";
import Note from "../../../models/Note";

dbConnect();

export default async (req,res)=> {
    const  {
        query : {id},
        method,
        body
    } = req;

    console.log(body);

    switch(method) {
        case 'GET':
            try{
                const note = await Note.findById(id);

                if(!note) return res.status(400).json({success: false});

                return res.status(200).json({success:true, data : note});
            } catch {
                res.status(400).json({success:false})
            }
            break;
        case 'PUT':
            try {
                const note = await Note.findByIdAndUpdate(id,body, {
                    new: true,
                    runValidators: true
                });

                if(!note) return res.status(400).json({success: false});

                return res.status(200).json({success:true, data : note});
            } catch {
                res.status(400).json({success:false})
            }
            break;
        case 'DELETE':
            try {
                const note = await Note.deleteOne({_id:id})
                if(!note) return res.status(400).json({success: false});

                return res.status(200).json({success:true, data : {}});
            } catch {
                return res.status(400).json({success: false});
            }
            break;
        default:
            return res.status(400).json({success: false});
            break;
    }
}