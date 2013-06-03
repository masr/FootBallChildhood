musicFixed=false;

 var initiation={

 glory_init:function(){
	 if(!document.getElementById('gloryblock'))
                      	return;
	
  glory_rows=$('#gloryblock .t1 tr').get();
   for(i=1;i<glory_rows.length;i++)
   {
   pic=glory_rows[i].id;

   glory_rows[i].picindex=pic.substring(9,pic.length);

     $(glory_rows[i]).hover(function(){
	  show=$('#showpic').get(0);
	  show.style.display="";
	  show.style.backgroundImage="url('img/myhero/glory/pic"+this.picindex+".jpg')";
	
	     if($('#indexBody').css('backgroundColor')=='#99cc00'||$('#indexBody').css('backgroundColor')=='rgb(153, 204, 0)')
		     this.style.backgroundColor="#99cc00";
			 else
			 this.style.backgroundColor='#ffffff'; 
			 
	$(show).fadeIn(400).fadeOut(800);	
     },function(){ 
		 show=$('#showpic').css({display:"none",backgroundImage:""});
		 this.style.backgroundColor="";
	
 		 
		 });
   }
},
changeFootballIcon:function(e)
 {

      var imageDiv=$(e.target).parent().eq(0).prev().eq(0).children().get(0);
  if(e.type=='mouseover')
  {
     imageDiv.style.visibility='visible';
 }else if(e.type=='mouseout')
 {
   imageDiv.style.visibility='hidden';
 }
 var imageDiv=$(e.target).parent().eq(0).next().eq(0).children().get(0);
  if(e.type=='mouseover')
  {
     imageDiv.style.visibility='visible';
 }else if(e.type=='mouseout')
 {
   imageDiv.style.visibility='hidden';
 }
 },
 init:function()
 {
 

 for(i=1;i<=4;i++)//导航栏定义连接效果
 {
	 
	$('#guide'+i).click(function(e) {
		$('#content').load($(this).attr('href'));
		$('#content').get(0).style.visibility="visible";
		$('#content').css("display","none").fadeIn(1500);
		xmlProcess.guideClick(e);
		
		if(this.id=='guide3')
		 setTimeout("initiation.glory_init();",100);
		return false;	
	});
 }
 

     
            $('#firstul>li>a').bind('mouseover',function(e){initiation.changeFootballIcon(e)}).bind('mouseout',function(e){initiation.changeFootballIcon(e);});
           
    

     $('#firstul img').each( function(){ $(this).attr('src','./img/mainstyle/football_on.gif');
      this.style.visibility='hidden';
      } );
	  
	  	  $("#special").bind('mouseenter',function(){			 
					    $("#secondmenu").fadeIn('slow');
						}).bind('mouseout',function(){	clock=setTimeout("$('#secondmenu').fadeOut('slow')",500);});			
		  
		  $('#secondmenu').bind('mouseleave',function(){
												$(this).fadeOut('slow');
													  }).bind('mouseenter',function(){
														    clearTimeout(clock);
														  });
		  
		  $('#secondmenu li').each(function(){
											  $(this).click(function(){
										if(musicFixed==false)							 
								             $('#bgs').attr('src','./music/'+this.className.substring(5,6)+".mp3")
										for(i=0;i<4;i++)
									{
										if(('style'+i)==this.className)
			$('#css'+i).attr("rel","stylesheet").get(0).disabled=false;
			                         else
									$('#css'+i).attr("rel"," ").get(0).disabled=true;	
									}
																	 });
											  });
							
               $('#musicChange').click(function(){
			
				             if(musicFixed==false)
							  { musicFixed=true;$(this).html('不固定音乐');}
							     else
								   {musicFixed=false;$(this).html('固定音乐');}
				   
												 });
 }

	 }
 


 
 
 var xmlProcess={

 guideClick:function(e)
 {
  
  var xmlReader;
  try{
      xmlReader=new ActiveXObject("Microsoft.XMLDOM");
    }catch(e)
    {
       try{
       xmlReader=document.implementation.createDocument("","topics",null);
       }catch(e)
       {
       }
    }

  
    xmlProcess.writeDiv=document.getElementById('sideBar');
   
    var index=e.target.id.substring(5,6);
        xmlReader.async=false;
    
  xmlReader.load('./file/rss.xml');//这里有浏览器兼容问题
    xmlProcess.writeBar(index,xmlReader);

      
     
 },
 writeBar:function(index,reader)
 {

  index=parseInt(index);
 xmlProcess.writeDiv.innerHTML="<div id='sideBarTop'><div id='sideBarPic'></div></div>";

   items=reader.getElementsByTagName('topic')[index-1].getElementsByTagName('item');
   var title=new Array(items.length);
   var content=new Array(items.length);
   var link=new Array(items.length);
  var pic=new Array(items.length);
   
   
   for(i=0;i<items.length;i++)
   {
    
     title[i]=items[i].getElementsByTagName('title')[0].firstChild.nodeValue;   
     content[i]=items[i].getElementsByTagName('content')[0].firstChild.nodeValue;
     link[i]=items[i].getElementsByTagName('link')[0].firstChild.nodeValue;
      pic[i]=items[i].getElementsByTagName('pic')[0].firstChild.nodeValue; 
      
   }
   
   for(i=0;i<items.length;i++)
   {
   xmlProcess.writeDiv.innerHTML+="<div class='oneside'><p class='titleSideBar'><a class=sidePic"+i+" href="+link[i]+" title="+content[i]+">"+title[i]+"</a></p><p class='contentSideBar'><a class=sidePic"+i+" href="+link[i]+" >"+content[i]+"</a></p></div><div class='divider1'></div>";
   }
   
    for(i=0;i<items.length;i++)
   {
      $('.sidePic'+i)[0].picindex=pic[i];
      $('.sidePic'+i)[1].picindex=pic[i];
     $('.sidePic'+i).mouseover(function(){
        $('#sideBarPic').css("backgroundImage","url("+this.picindex+")")}).mouseout(function()
        {
     $('#sideBarPic').css("backgroundImage","");
        });
   }
   

   
     
   $('#sideBar a').click(function(){
         	$('#content').load($(this).attr('href'));
			$('#content').css("display","none").fadeIn(1500);
			 setTimeout("initiation.glory_init();",100);
         	return false;
      });
      
  
 }
}

$(function(){
initiation.init();
})
