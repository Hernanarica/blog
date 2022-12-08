import * as comment from "../model/comments.js";
import * as yup from "yup";
import moment from 'moment';

moment.locale('es-mx');

let commentSchema = yup.object({
   text: yup.string().required("El texto es requerido")
}).noUnknown();

export function createComment(req, res) {
   commentSchema.validate(req.body)
       .then(commentValid => {
           return comment.createComment({
              ...commentValid,
              fk_post: req.params.fk_post,
              fk_user: req.user._id,
              created_at: moment().format('LL')
           });
       })
         .then(() => {
           res.json({ msg: 'El comentario fue creado con éxito' });
         }).catch(err => {
         res.status(400).json({ msg: 'Error al crear el comentario', err: err.errors });
       });
}

export function getAllComment(req, res) {
   comment.getAllComment(req.params.fk_post)
       .then(comments => {
           res.json(comments);
       }).catch(err => {
       res.status(400).json({ msg: 'Error al obtener los comentarios', err: err.errors });
   });
}
