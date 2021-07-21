$( document ).ready(function() {
  setTimeout(function(){
    (function($) {
      "use strict"; // Start of use strict
      
      // Toggle the side navigation
      $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
        console.log("click");
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
          $('.sidebar .collapse').collapse('hide');
        };
      });
    
      // Close any open menu accordions when window is resized below 768px
      $(window).resize(function() {
        if ($(window).width() < 768) {
          $('.sidebar .collapse').collapse('hide');
        };
      });
    
      // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
      $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
        if ($(window).width() > 768) {
          var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
          this.scrollTop += (delta < 0 ? 1 : -1) * 30;
          e.preventDefault();
        }
      });
    
      // Scroll to top button appear
      $(document).on('scroll', function() {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
          $('.scroll-to-top').fadeIn();
        } else {
          $('.scroll-to-top').fadeOut();
        }
      });
    
      // Smooth scrolling using jQuery easing
      $(document).on('click', 'a.scroll-to-top', function(e) {
        var $anchor = $(this);
        $('html, body').stop().animate({
          scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1000, 'easeInOutExpo');
        e.preventDefault();
      });

      $(".nav-link").click(function(event){
        $(".nav-item").removeClass("active");
        console.log(event);
        var page3 = $(event.delegateTarget).attr("id");
        console.log( page3);
        $(event.delegateTarget).closest(".nav-item").addClass("active")
        localStorage.last_page = page3;
        var page_name = $(event.delegateTarget).find("span").text();
        call_data_fill(page3, page_name);
      });
      // $("#home").click()
      if (localStorage.last_page == undefined){
        localStorage.last_page = "home"
      }
      $("#"+localStorage.last_page).click();

      function call_data_fill(page, page_name){
        $("#page_name").text(page_name);
        $.get("/pages/"+page+".html", function(data){
          $("#page_content").html(data);
        
        
        //fill page content
        switch (page){
          case "home":
            $("#test_url").val(localStorage.test_url);
            $("#test_type").val(localStorage.test_type);
            $("#test_json").val(localStorage.test_json);
            $("#test_send").click(function(data){
              var url = $("#test_url").val();
              localStorage.test_url = url;
              var type = $("#test_type").val();
              localStorage.test_type = type;
              var json = JSON.parse($("#test_json").val().replace(/(\r\n|\n|\r)/gm, "").replace(/[\u0000-\u0019]+/g,""));
              localStorage.test_json = $("#test_json").val();
              console.log(url, type, json);
              
              $.ajax({
                url: url,
                type: type,
                data:  json,
                success: function(data) {
                  alert('Load was performed.');
                  location.reload();
                },
                error: function(data) {
                  alert('faild to send');
                  location.reload();
                }
              });
            });
            break;
          case "persons":
            $.get("/api/subject", function(data){
              console.log(data);
              var body= $("table#persons_table").find("tbody");
              data.data.forEach(subject => {
                if (subject.Birthdate !=null){
                  var d = new Date(subject.Birthdate);
                  console.log(d);
                  var format = d.getFullYear()+"-"+(d.getMonth()+1).toString().padStart(2, '0')+"-"+d.getDate().toString().padStart(2, '0');
                  subject.Birthdate=format
                  console.log(format);
                }
                var content = "<tr data = '"+subject.ID+"'><td>"+subject.ID+"</td><td>"+subject.FirstName+"</td><td>"+
                subject.LastName+"</td><td>"+subject.Place+"</td><td>"+subject.Country+"</td><td>"+subject.Gender+"</td><td>"+
                subject.Birthdate+"</td><td>"+subject.Remark+"</td><td>"+
                '<button type="button" class="btn btn-outline-info btn-sm open_person_modal" data-toggle="modal" data-target="#changePerson"><i class="fas fa-edit"></i></button></td></tr>';
                //console.log(content);
                body.append(content);
              });
              $(".open_person_modal").click(function(data){

                var id = $(this).closest("tr").attr("data");
                if (id != undefined){
                  $.get("/api/subject/"+id, function(data){
                    var d = new Date(data.data[0].Birthdate);
                    var format = d.getFullYear()+"-"+(d.getMonth()+1).toString().padStart(2, '0')+"-"+d.getDate().toString().padStart(2, '0');
                    data.data[0].Birthdate=format;
                    $("[aria-describedby='modal_ID']").val(data.data[0].ID);
                    $("[aria-describedby='modal_UUID']").val(data.data[0].UUID);
                    $("[aria-describedby='modal_FirstName']").val(data.data[0].FirstName);
                    $("[aria-describedby='modal_LastName']").val(data.data[0].LastName);
                    $("[aria-describedby='modal_BirthDay']").val(data.data[0].Birthdate);
                    $("[aria-describedby='modal_placeOfBirth']").val(data.data[0].Place);
                    $("[aria-describedby='modal_countryOfBirth']").val(data.data[0].Country);
                    //To DO gender
                    var g = "#"+data.data[0].Gender
                    $("[aria-describedby='modal_Gender'").filter(g).attr('checked', true)
                    $("[aria-describedby='modal_Gender']").val(data.data[0].Gender);
                    $("[aria-describedby='modal_Remark']").val(data.data[0].Remark)
                  });
                }else{
                  $("[aria-describedby='modal_ID']").val(null);
                  $("[aria-describedby='modal_UUID']").val(null);
                  $("[aria-describedby='modal_FirstName']").val(null);
                  $("[aria-describedby='modal_LastName']").val(null);
                  $("[aria-describedby='modal_BirthDay']").val(null);
                  $("[aria-describedby='modal_placeOfBirth']").val(null);
                  $("[aria-describedby='modal_countryOfBirth']").val(null);
                  $("[aria-describedby='modal_Gender']").val(null);
                  $("[aria-describedby='modal_Remark']").val(null);
                }
              });
              $("#model_save").click(function(data){
                var id = $("[aria-describedby='modal_ID']").val();
                var uuid = $("[aria-describedby='modal_UUID']").val();
                var name = $("[aria-describedby='modal_FirstName']").val();
                var lastname = $("[aria-describedby='modal_LastName']").val();
                var placeOfBirth = $("[aria-describedby='modal_placeOfBirth']").val();
                var countryOfBirth = $("[aria-describedby='modal_countryOfBirth']").val();
                var gender =  $("[aria-describedby='modal_Gender']:checked")[0]["ariaLabel"];
                console.log(gender);
                var birthday = $("[aria-describedby='modal_BirthDay']").val()
                //console.log(birthday);
                var remark = $("[aria-describedby='modal_Remark']").val()
                if (id =="" || id == undefined){
                  //post INSERT
                  $.ajax({
                    url: '/api/subject',
                    type: 'POST',
                    data:  {
                            FirstName: name,
                            LastName: lastname,
                            Remark: remark,
                            Place: placeOfBirth,
                            Country: countryOfBirth,
                            Gender: gender,
                            BirthDay: birthday
                            },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    },
                    error: function(data) {
                      alert('faild to send');
                      location.reload();
                    }
                  });
                } else{
                  //put UPDATE
                  $.ajax({
                    url: '/api/subject/'+id,
                    type: 'PUT',
                    data:  {
                            UUID:uuid,
                            FirstName: name,
                            LastName: lastname,
                            Remark: remark,
                            Place: placeOfBirth,
                            Country: countryOfBirth,
                            Gender: gender,
                            BirthDay: birthday
                          },
                    success: function(data) {
                      //alert('Load was performed.');
                      location.reload();
                    },

                  });
                }
              });
            });
            break;
          case "experiments":
            $.get("/experiments", function(data){
              console.log(data);
              var body= $("table#experiments_table").find("tbody");
              data.data.forEach(iter => {
                var content = "<tr data = '"+iter.ID+"'><td>"+iter.ID+"</td><td>"+iter.Name+"</td><td>"+
                iter.Description+"</td><td>"+iter.MetadataNo+"</td><td>"+iter.MetaDescription+"</td><td>"+
                '<button type="button" class="btn btn-outline-info btn-sm open_modal" data-toggle="modal" data-target="#changeExperiment"><i class="fas fa-edit"></i></button></td></tr>';
                //console.log(content);
                body.append(content);
              });
              $(".open_modal").click(function(data){

                var id = $(this).closest("tr").attr("data");
                if (id != undefined){
                  $.get("/experiments/"+id, function(data){
                    $("[aria-describedby='modal_ID']").val(data.data[0].ID);
                    $("[aria-describedby='modal_Name']").val(data.data[0].Name);
                    $("[aria-describedby='modal_Description']").val(data.data[0].Description);
                    $("[aria-describedby='modal_MetaID']").val(data.data[0].MetadataNo);
                    $("[aria-describedby='modal_MetaDesc']").val(data.data[0].MetaDescription);
                  });
                }else{
                  $("[aria-describedby='modal_ID']").val(null);
                  $("[aria-describedby='modal_Name']").val(null);
                  $("[aria-describedby='modal_Description']").val(null);
                  $("[aria-describedby='modal_MetaID']").val(null);
                  $("[aria-describedby='modal_MetaDesc']").val(null);
                }
              });
              $("#model_save").click(function(data){
                var id = $("[aria-describedby='modal_ID']").val();
                var name = $("[aria-describedby='modal_Name']").val();
                var Description = $("[aria-describedby='modal_Description']").val();
                var MetaID = $("[aria-describedby='modal_MetaID']").val();
                var MetaDesc = $("[aria-describedby='modal_MetaDesc']").val();
                if (id =="" || id == undefined){
                  //post INSERT
                  $.ajax({
                    url: '/experiments',
                    type: 'POST',
                    data:  {
                            Name: name,
                            Description: Description,
                            },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    }
                  });
                } else{
                  //put UPDATE
                  $.ajax({
                    url: '/experiments/'+id,
                    type: 'PUT',
                    data: {
                          Name: name,
                          Description: Description,
                          },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    },

                  });
                }
              });
            });
            break;
          case "sensors":
            $.get("/sensor", function(data){
              console.log(data);
              var body= $("table#sensors_table").find("tbody");
              data.data.forEach(iter => {
                var content = "<tr data = '"+iter.ID+"'><td>"+iter.ID+"</td><td>"+iter.Range+"</td><td>"+
                iter.SensorTypeID+"</td><td>"+iter.SensorTypeName+"</td><td>"+iter.SensorTypeDescription+"</td><td>"+iter.SensorTypeDOF+"</td><td>"+iter.SensorTypeNumber+"</td><td>"+
                '<button type="button" class="btn btn-outline-info btn-sm open_modal" data-toggle="modal" data-target="#changeSensor"><i class="fas fa-edit"></i></button></td></tr>';
                //console.log(content);
                body.append(content);
              });
              $(".open_modal").click(function(data){

                var id = $(this).closest("tr").attr("data");
                //populate sensor type 
                $.get("sensortypes", function(data){
                  var bod = $("#modal_Sensor_Type_select");
                  bod.empty();
                  bod.append("<option value='none'>Choose</option>");
                  data.data.forEach(type => {
                    var cont = "<option value='"+type.ID+"'>"+type.Name+"</option>";
                    bod.append(cont);
                  });
                })

                if (id != undefined){
                  $.get("/sensor/"+id, function(data){
                    $("[aria-describedby='modal_Sensor_ID']").val(data.data[0].ID);
                    $("[aria-describedby='modal_Sensor_Range']").val(data.data[0].Range);
                    $("#modal_Sensor_Type_select").val(data.data[0].SensorTypeID).change();
                  });
                }else{
                  $("[aria-describedby='modal_Sensor_ID']").val(null);
                  $("[aria-describedby='modal_Sensor_Range']").val(null);
                  $("#modal_Sensor_Type_select").val("none").change();
                }
              });
              $("#model_Sensor_save").click(function(data){
                var id = $("[aria-describedby='modal_Sensor_ID']").val();
                var sensor_range = $("[aria-describedby='modal_Sensor_Range']").val();
                var sensor_type_id = $("#modal_Sensor_Type_select").val();
                if (id =="" || id == undefined){
                  //post INSERT
                  $.ajax({
                    url: '/sensor',
                    type: 'POST',
                    data:  {
                            Range: sensor_range,
                            SensorTypeID: sensor_type_id,
                            },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    }
                  });
                } else{
                  //put UPDATE
                  $.ajax({
                    url: '/sensor/'+id,
                    type: 'PUT',
                    data: {
                          Range: sensor_range,
                          SensorTypeID: sensor_type_id,
                          },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    },

                  });
                }
              });
            });
            $.get("/sensortypes", function(data){
              console.log(data);
              var body= $("table#types_table").find("tbody");
              data.data.forEach(iter => {
                var content = "<tr data = '"+iter.ID+"'><td>"+iter.ID+"</td><td>"+iter.Name+"</td><td>"+
                iter.Description+"</td><td>"+iter.DOF+"</td><td>"+iter.Number+"</td><td>"+
                '<button type="button" class="btn btn-outline-info btn-sm open_modal_sensor_type" data-toggle="modal" data-target="#changeSensorType"><i class="fas fa-edit"></i></button></td></tr>';
                //console.log(content);
                body.append(content);
              });
              $(".open_modal_sensor_type").click(function(data){

                var id = $(this).closest("tr").attr("data");
                if (id != undefined){
                  $.get("/sensortypes/"+id, function(data){
                    $("[aria-describedby='modal_Type_ID']").val(data.data[0].ID);
                    $("[aria-describedby='modal_Type_Name']").val(data.data[0].Name);
                    $("[aria-describedby='modal_Type_Description']").val(data.data[0].Description);
                    $("[aria-describedby='modal_Type_dof']").val(data.data[0].DOF);
                    $("[aria-describedby='modal_Type_Number']").val(data.data[0].Number);
                  });
                }else{
                  $("[aria-describedby='modal_Type_ID']").val(null);
                  $("[aria-describedby='modal_Type_Name']").val(null);
                  $("[aria-describedby='modal_Type_Description']").val(null);
                  $("[aria-describedby='modal_Type_dof']").val(null);
                  $("[aria-describedby='modal_Type_Number']").val(null);
                }
              });
              $("#model_save").click(function(data){
                var id = $("[aria-describedby='modal_Type_ID']").val();
                var name = $("[aria-describedby='modal_Type_Name']").val();
                var description = $("[aria-describedby='modal_Type_Description']").val();
                var typeDOF = $("[aria-describedby='modal_Type_dof']").val();
                var typeNum = $("[aria-describedby='modal_Type_Number']").val();
                if (id =="" || id == undefined){
                  //post INSERT
                  $.ajax({
                    url: '/sensortypes',
                    type: 'POST',
                    data:  {
                            Name: name,
                            Description: description,
                            DOF: typeDOF,
                            Number: typeNum,
                            },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    }
                  });
                } else{
                  //put UPDATE
                  $.ajax({
                    url: '/sensortypes/'+id,
                    type: 'PUT',
                    data: {
                          Name: name,
                          Description: description,
                          DOF: typeDOF,
                          Number: typeNum,
                          },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    },

                  });
                }
              });
            });
            break;
          case "devices":
            $.get("/device", function(data){
              console.log(data);
              var body= $("table#device_table").find("tbody");
              data.data.forEach(iter => {
                  var content = "<tr data = '"+iter.ID+"'><td>"+iter.ID+"</td><td>"+iter.DeviceSampleTime+"</td><td>"+
                  iter.DeviceTypeID+"</td><td>"+iter.DeviceTypeName+"</td><td>"+iter.DeviceTypeDescription+"</td><td>"+iter.DeviceTypeSenosorCount+"</td><td></td><td>"+
                  '<button type="button" class="btn btn-outline-info btn-sm open_modal" data-toggle="modal" data-target="#changeDevice"><i class="fas fa-edit"></i></button></td></tr>';
                  //console.log(content);
                  body.append(content);
              });
              $.get("/devicesensor", function(data){
                data.data.forEach(sensor => {
                  var sensorfield= body.find("tr[data='" + sensor.DeviceID + "']>td:nth-child(7)");
                  console.log(sensorfield);
                  var content = '<span class="badge badge-dark">'+sensor.SensorID+':'+sensor.SensorTypeName+':'+sensor.Range+'</span>'
                  sensorfield.append(content);
                });
              })
              $(".open_modal").click(function(data){
                var id = $(this).closest("tr").attr("data");
                //populate sensor type 
                $.get("/devicetypes", function(data){
                  var bod = $("#modal_Device_Type_select");
                  bod.empty();
                  bod.append("<option value='none'>Choose</option>");
                  data.data.forEach(type => {
                    var cont = "<option value='"+type.ID+"'>"+type.Name+"</option>";
                    bod.append(cont);
                  });
                })
                //populae schoose sensor
                $.get("/sensor", function(data){
                  var bod = $("#select_sensors");
                  bod.empty();
                  //bod.append("<option value='none'>Choose</option>");
                  var current_sensors = [];
                  data.data.forEach(type => {
                    var cont = "<option value='"+type.ID+"'>"+type.ID+":"+type.SensorTypeName+":"+type.Range+"</option>";
                    bod.append(cont);
                  });
                  if (id != undefined){
                  $.get("/devicesensor?deviceID="+id, function(data){
                      data.data.forEach(sensor => {
                        current_sensors.push(sensor.SensorID);
                      });
                      $('#select_sensors').multiSelect();
                      //$('#select_sensors').multiSelect('select', current_sensors);
                      $('#select_sensors').val(current_sensors);
                      $('#select_sensors').multiSelect('refresh');
                    })
                  }else{
                    $('#select_sensors').multiSelect();
                    //$('#select_sensors').multiSelect('select', current_sensors);
                    $('#select_sensors').val(current_sensors);
                    $('#select_sensors').multiSelect('refresh');
                  }
                  //console.log(current_sensors);
                })
                if (id != undefined){
                  $.get("/device/"+id, function(data){
                    $("[aria-describedby='modal_Device_ID']").val(data.data[0].ID);
                    $("[aria-describedby='modal_Device_Sample']").val(data.data[0].DeviceSampleTime);
                    $("#modal_Device_Type_select").val(data.data[0].DeviceTypeID).change();
                  });
                }else{
                  $("[aria-describedby='modal_Device_ID']").val(null);
                  $("[aria-describedby='modal_Device_Sample']").val(null);
                  $("#modal_Device_Type_select").val("none").change();
                }
              });
              $("#model_Device_save").click(function(data){
                var id = $("[aria-describedby='modal_Device_ID']").val();
                var device_sample = $("[aria-describedby='modal_Device_Sample']").val();
                var device_type_id = $("#modal_Device_Type_select").val();
                var sensors = $('#select_sensors').val();
                if (id =="" || id == undefined){
                  //post INSERT
                  $.ajax({
                    url: '/device',
                    type: 'POST',
                    data:  {
                            DeviceSampleTime: device_sample,
                            DeviceTypeID: device_type_id,
                            },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    }
                  });
                } else{
                  //put UPDATE
                  $.ajax({
                    url: '/device/'+id,
                    type: 'PUT',
                    data: {
                          DeviceSampleTime: device_sample,
                          DeviceTypeID: device_type_id,
                          },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    },

                  });
                }
              });
            });
            $.get("/devicetypes", function(data){
              console.log(data);
              var body= $("table#types_table").find("tbody");
              data.data.forEach(iter => {
                var content = "<tr data = '"+iter.ID+"'><td>"+iter.ID+"</td><td>"+iter.Name+"</td><td>"+
                iter.Description+"</td><td>"+iter.SensorCount+"</td><td>"+
                '<button type="button" class="btn btn-outline-info btn-sm open_modal_type" data-toggle="modal" data-target="#changeDeviceType"><i class="fas fa-edit"></i></button></td></tr>';
                //console.log(content);
                body.append(content);
              });
              $(".open_modal_type").click(function(data){

                var id = $(this).closest("tr").attr("data");
                if (id != undefined){
                  $.get("/devicetypes/"+id, function(data){
                    $("[aria-describedby='modal_Type_ID']").val(data.data[0].ID);
                    $("[aria-describedby='modal_Type_Name']").val(data.data[0].Name);
                    $("[aria-describedby='modal_Type_Description']").val(data.data[0].Description);
                    $("[aria-describedby='modal_sensor_count']").val(data.data[0].SensorCount);
                  });
                }else{
                  $("[aria-describedby='modal_Type_ID']").val(null);
                  $("[aria-describedby='modal_Type_Name']").val(null);
                  $("[aria-describedby='modal_Type_Description']").val(null);
                  $("[aria-describedby='modal_sensor_count']").val(null);
                }
              });
              $("#model_save").click(function(data){
                var id = $("[aria-describedby='modal_Type_ID']").val();
                var name = $("[aria-describedby='modal_Type_Name']").val();
                var description = $("[aria-describedby='modal_Type_Description']").val();
                var sensorCount = $("[aria-describedby='modal_sensor_count']").val();
                if (id =="" || id == undefined){
                  //post INSERT
                  $.ajax({
                    url: '/devicetypes',
                    type: 'POST',
                    data:  {
                            Name: name,
                            Description: description,
                            SensorCount: sensorCount,
                            },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    }
                  });
                } else{
                  //put UPDATE
                  $.ajax({
                    url: '/devicetypes/'+id,
                    type: 'PUT',
                    data: {
                          Name: name,
                          Description: description,
                          SensorCount: sensorCount,
                          },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    },

                  });
                }
              });
            });
            break;
          case "measurements":
            $.get("/measurements", function(data){
              console.log(data);
              var body= $("table#measure_table").find("tbody");
              data.data.forEach(iter => {
                  if (iter.MeasurementDate!=null){
                    var d = new Date(iter.MeasurementDate);
                    console.log(d);
                    var format = d.getFullYear()+"-"+(d.getMonth()+1).toString().padStart(2, '0')+"-"+d.getDate().toString().padStart(2, '0');
                    iter.MeasurementDate=format
                    console.log(format);
                  }
                  var content = "<tr data = '"+iter.ID+"'><td>"+iter.ID+"</td><td>"+iter.ExperimentID+"</td><td>"+iter.ExperimentName+
                  "</td><td>"+iter.SubjectID+"</td><td>"+iter.SubjectFirstName+" "+iter.SubjectLastName+"</td><td>"+iter.MeasurementDate+"</td><td>"+iter.Longitude+" / "+iter.Longitude+"</td><td>"+iter.Adress+"</td><td>"+
                  '<button type="button" class="btn btn-outline-info btn-sm open_modal" data-toggle="modal" data-target="#changeMeasurement"><i class="fas fa-edit"></i></button></td></tr>';
                  //console.log(content);
                  body.append(content);
              });
              $(".open_modal").click(function(data){
                var id = $(this).closest("tr").attr("data");
                //populate sensor type 
                $.get("/devicetypes", function(data){
                  var bod = $("#modal_Device_Type_select");
                  bod.empty();
                  bod.append("<option value='none'>Choose</option>");
                  data.data.forEach(type => {
                    var cont = "<option value='"+type.ID+"'>"+type.Name+"</option>";
                    bod.append(cont);
                  });
                })
                //populae schoose sensor
                $.get("/sensor", function(data){
                  var bod = $("#select_sensors");
                  bod.empty();
                  //bod.append("<option value='none'>Choose</option>");
                  var current_sensors = [];
                  data.data.forEach(type => {
                    var cont = "<option value='"+type.ID+"'>"+type.ID+":"+type.SensorTypeName+":"+type.Range+"</option>";
                    bod.append(cont);
                  });
                  if (id != undefined){
                  $.get("/devicesensor?deviceID="+id, function(data){
                      data.data.forEach(sensor => {
                        current_sensors.push(sensor.SensorID);
                      });
                      $('#select_sensors').multiSelect();
                      //$('#select_sensors').multiSelect('select', current_sensors);
                      $('#select_sensors').val(current_sensors);
                      $('#select_sensors').multiSelect('refresh');
                    })
                  }else{
                    $('#select_sensors').multiSelect();
                    //$('#select_sensors').multiSelect('select', current_sensors);
                    $('#select_sensors').val(current_sensors);
                    $('#select_sensors').multiSelect('refresh');
                  }
                  //console.log(current_sensors);
                })
                if (id != undefined){
                  $.get("/device/"+id, function(data){
                    $("[aria-describedby='modal_Device_ID']").val(data.data[0].ID);
                    $("[aria-describedby='modal_Device_Sample']").val(data.data[0].DeviceSampleTime);
                    $("#modal_Device_Type_select").val(data.data[0].DeviceTypeID).change();
                  });
                }else{
                  $("[aria-describedby='modal_Device_ID']").val(null);
                  $("[aria-describedby='modal_Device_Sample']").val(null);
                  $("#modal_Device_Type_select").val("none").change();
                }
              });
              $("#model_Device_save").click(function(data){
                var id = $("[aria-describedby='modal_Device_ID']").val();
                var device_sample = $("[aria-describedby='modal_Device_Sample']").val();
                var device_type_id = $("#modal_Device_Type_select").val();
                var sensors = $('#select_sensors').val();
                if (id =="" || id == undefined){
                  //post INSERT
                  $.ajax({
                    url: '/device',
                    type: 'POST',
                    data:  {
                            DeviceSampleTime: device_sample,
                            DeviceTypeID: device_type_id,
                            },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    }
                  });
                } else{
                  //put UPDATE
                  $.ajax({
                    url: '/device/'+id,
                    type: 'PUT',
                    data: {
                          DeviceSampleTime: device_sample,
                          DeviceTypeID: device_type_id,
                          },
                    success: function(data) {
                      alert('Load was performed.');
                      location.reload();
                    },

                  });
                }
              });
            });
            break;
          case "import":
            break;
          case "export":
            break;
          default:
            break;
        }

      });
      }

    })(jQuery); // End of use strict
    
  }, 60);
});