import * as comment from "../model/comments.js";
import * as yup from "yup";
import moment from 'moment';


moment.locale('es-mx');

let commentSchema = yup.object({
   text: yup.string().required("El texto es requerido"),
   fk_post: yup.string().required("El id del post es requerido"),
   fk_user: yup.string().required("El id del usuario es requerido")
}).noUnknown();

let commentSchemaEdit = yup.object({
   text: yup.string().required("El texto es requerido"),
}).noUnknown();

export function createComment(req, res) {
   commentSchema.validate(req.body)
       .then(commentValid => {
           return comment.create({
              ...commentValid,
              date: moment().format('LLL'),
           });
       })
         .then(() => {
           res.json({ msg: 'El comentario fue creado con éxito' });
         }).catch(err => {
         res.status(400).json({ msg: 'Error al crear el comentario', err: err.errors });
       });
}

//metodo para traer todos los comentarios por medio el fk_post
export function getAllComment(req, res) {
   console.log(req.params.fk_post);
   const fk_post = req.params.fk_post;
   comment.getAll(fk_post)
       .then(comments => {
           res.json(comments);
       }).catch(err => {
       res.status(400).json({ msg: 'Error al obtener los comentarios', err: err.errors });
       console.log(err);
   });
   if (!req.params.fk_post) {
         res.status(400).json({ msg: 'Error al obtener los comentarios' });
   }
}

//editar el comentario del usuario
export function editComment(req, res) {
   commentSchemaEdit.validate(req.body)
       .then(commentSchemaEdit => {
           return comment.edit(req.params.id, commentSchemaEdit);
       })
         .then(() => {
           res.json({ msg: 'El comentario fue editado con éxito' });
         }).catch(err => {
         res.status(400).json({ msg: 'Error al editar el comentario', err: err.errors });
       });
}

//eliminar el comentario del usuario
export function deleteComment(req, res) {
   comment.borrar(req.params.id)
       .then(() => {
           res.json({ msg: 'El comentario fue eliminado con éxito' });
       }).catch(err => {
       res.status(400).json({ msg: 'Error al eliminar el comentario', err: err.errors });
   });
}
