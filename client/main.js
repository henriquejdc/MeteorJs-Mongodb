import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../imports/banco.js';
console.log(Sugestoes.find().count());

Meteor.startup(function() {
    $('[data-toggle="tooltip"]').tooltip();
    $('.carousel').carousel({
        interval: 3000
    });
});

var listaImagens = [{
        src: "fisico.jpeg",
        alt: "Logo da fisico",
        title: "Fisico",
        localTooltip: "top"
    },
    {
        src: "4fuel.png",
        alt: "Logo da 4 Fuel",
        title: "4 Fuel",
        localTooltip: "left"
    },
    {
        src: "arnold.png",
        alt: "Logo da Arnold Schwarzenegger Series",
        title: "Arnold Schwarzenegger Series",
        localTooltip: "left"
    },
    {
        src: "animal.png",
        alt: "Logo da Animal",
        title: "Animal",
        localTooltip: "left"
    }
];


var listaImagens2 = [{
        src: "dymatize.png",
        alt: "Logo da  Dymatize",
        title: "Dymatize",
        localTooltip: "top"
    },
    {
        src: "wheys.jpeg",
        alt: "Wheys",
        title: "Wheys",
        localTooltip: "left"
    },
    {
        src: "optimumnutrition.png",
        alt: "Logo da Optimum Nutrition",
        title: "Optimum Nutrition",
        localTooltip: "left"
    },
    {
        src: "integral.jpeg",
        alt: "Logo da integral",
        title: "integral",
        localTooltip: "left"
    },
    
];

Template.fotos.helpers({
    vetorImagens1: listaImagens,
    vetorImagens2: listaImagens2
});

Template.sugestao.events({
    'submit #form_sugestao': function(events){
            var nome1 = event.target.nome.value;
            var email1 = event.target.email.value;
            var sugest1 = event.target.sugest.value;
            var lido1 = "nao";
            Sugestoes.insert({nome: nome1, email: email1, sugestao: sugest1,lido: lido1, created: new Date()}); 
            event.preventDefault();
            alert('Enviado!');
            $("#form_sugestao").find('input').val("");
       }
  });

Template.footer.events({
        'click #mostra_janela': function(event){
        $("#modal_form").modal('show');
    }
});

Template.janelalogin.events({
    'submit #logar': function(events){
            var nome1 = event.target.nome.value;
            var senha1 = event.target.senha.value;        
            var str1 = "admin";
            var n = str1.localeCompare(nome1);
            var n1 = str1.localeCompare(senha1);
            if(n==0){
                if(n1==0){
                    $("#modal_admin").modal('show');
                }
            }
            event.preventDefault();
            $("#modal_form").modal('hide');
       }
  });

Template.janelaadmin.helpers({
'bdimages': function(){     
               return Sugestoes.find({}, {sort:{created: -1}});
    },
});


Template.janelaadmin.events({

'click #lido_imagem': function(events){
        var sug_id = this._id;
        var lido1 = "sim";
        Sugestoes.update({_id:sug_id}, {$set: {lido: lido1}});  
    },
'click #deleta_imagem': function(events){
        var sug_id = this._id;
        $("#"+sug_id).hide('slow', function(){
            Sugestoes.remove({"_id":sug_id}); 
            alert('Excluiu!');
        });
    },

});