#-------------------------------------------------------------------------------
# Name:        module1
# Purpose:
#
# Author:      Carlos
#
# Created:     23/03/2016
# Copyright:   (c) Carlos 2016
# Licence:     <your licence>
#-------------------------------------------------------------------------------

import arcpy
wskp = "C:\Users\Carlos\AppData\Roaming\ESRI\Desktop10.3\ArcCatalog\CARLOSHERRERA_PFM.sde"
#wskp = "C:\Users\Carlos\Dropbox\Proyecto\Madrid_mini_PRUEBAS.gdb"
arcpy.env.workspace = wskp
#arcpy.env.workspace = "C:\Users\Carlos\Dropbox\Proyecto\Madrid_mini_PRUEBAS.gdb"

#Pedimos el tipo de delito y el a?o en que ocurri?
delito = arcpy.GetParameter(0)
anio = arcpy.GetParameter(1)

#Opciones para el tipo de delito
if delito == "Atracos joyerias":
    capa_delito = "{}\PFM.DBO.Atracos_joyerias".format(wskp)
elif delito == "Hurto":
    capa_delito = "{}\PFM.DBO.Hurto".format(wskp)
elif delito == "Robos":
    capa_delito = "{}\PFM.DBO.Robos".format(wskp)
elif delito == "Robos con violencia":
    capa_delito = "{}\PFM.DBO.Robos_con_violencia".format(wskp)
elif delito == "Robos con violencia en viviendas":
    capa_delito = "{}\PFM.DBO.Robos_con_violencia_en_viviendas".format(wskp)
elif delito == "Robos en establecimientos":
    capa_delito = "{}\PFM.DBO.Robos_en_establecimientos".format(wskp)
elif delito == "Robos fuerza en las cosas viviendas":
    capa_delito = "{}\PFM.DBO.Robos_fuerza_en_las_cosas_viviendas".format(wskp)
elif delito == "Sustraccion vehiculos":
    capa_delito = "{}\PFM.DBO.Sustraccion_vehiculos".format(wskp)
elif delito == "Tirones via publica":
    capa_delito = "{}\PFM.DBO.Tirones_via_publica".format(wskp)

#Opciones para el a?o
if anio == "2008":
    n_anio = "2008_mini"
elif anio == "2009":
    n_anio = "2009_mini"
elif anio == "2010":
    n_anio = "2010_mini"
elif anio == "2011":
    n_anio = "2011_mini"
elif anio == "2012":
    n_anio = "2012_mini"
elif anio == "2013":
    n_anio = "2013_mini"


#Formamos ruta de la capa con las opciones introducidas por el usuario
capa_delito_final = "{0}_{1}".format(capa_delito,n_anio)

#Pedimos rango de fechas
fecha_inicial = arcpy.GetParameter(2)
fecha_final = arcpy.GetParameter(3)

#Opciones para elecci?n del distrito
distrito = arcpy.GetParameter(4)
if distrito == "Centro":
    n_distrito = "Centro"
elif distrito == "Arganzuela":
	n_distrito = "Arganzuela"
elif distrito == "Retiro":
    n_distrito = "Retiro"
elif distrito == "Salamanca":
    n_distrito = "Salamanca"
elif distrito == "Chamartin":
    n_distrito = "Chamart?n"
elif distrito == "Tetuan":
    n_distrito = "Tetu?n"
elif distrito == "Chamberi":
    n_distrito = "Chamber?"
elif distrito == "Fuencarral - El Pardo":
    n_distrito = "Fuencarral - El Pardo"
elif distrito == "Moncloa - Aravaca":
    n_distrito = "Moncloa - Aravaca"
elif distrito == "Latina":
    n_distrito = "Latina"
elif distrito == "Carabanchel":
    n_distrito = "Carabanchel"
elif distrito == "Usera":
    n_distrito = "Usera"
elif distrito == "Puente de Vallecas":
    n_distrito = "Puente de Vallecas"
elif distrito == "Moratalaz":
    n_distrito = "Moratalaz"
elif distrito == "Ciudad Lineal":
    n_distrito = "Ciudad Lineal"
elif distrito == "Hortaleza":
    n_distrito = "Hortaleza"
elif distrito == "Villaverde":
    n_distrito = "Villaverde"
elif distrito == "Villa de Vallecas":
    n_distrito = "Villa de Vallecas"
elif distrito == "Vicalvaro":
    n_distrito = "Vic?lvaro"
elif distrito == "San Blas - Canillejas":
    n_distrito = "San Blas - Canillejas"
elif distrito == "Barajas":
    n_distrito = "Barajas"

#Opciones para la elecci?n del barrio
barrio = arcpy.GetParameter(5)
if barrio == "Palacio":
    n_barrio = "Palacio"
elif barrio == "Embajadores":
    n_barrio = "Embajadores"
elif barrio == "Cortes":
    n_barrio = "Cortes"
elif barrio == "Justicia":
    n_barrio = "Justicia"
elif barrio == "Universidad":
    n_barrio = "Universidad"
elif barrio == "Sol":
    n_barrio = "Sol"
elif barrio == "Imperial":
    n_barrio = "Imperial"
elif barrio == "Acacias":
    n_barrio = "Acacias"
elif barrio == "Chopera":
    n_barrio = "Chopera"
elif barrio == "Legazpi":
    n_barrio = "Legazpi"
elif barrio == "Delicias":
    n_barrio = "Delicias"
elif barrio == "Palos_de_Moguer":
    n_barrio = "Palos_de_Moguer"
elif barrio == "Atocha":
    n_barrio = "Atocha"
elif barrio == "Pacifico":
    n_barrio = "Pacifico"
elif barrio == "Adelfas":
    n_barrio = "Adelfas"
elif barrio == "Estrella":
    n_barrio = "Estrella"
elif barrio == "Ibiza":
    n_barrio = "Ibiza"
elif barrio == "Jeronimos":
    n_barrio = "Jeronimos"
elif barrio == "Nino_Jesus":
    n_barrio = "Nino_Jesus"
elif barrio == "Recoletos":
    n_barrio = "Recoletos"
elif barrio == "Goya":
    n_barrio = "Goya"
elif barrio == "Fuente_del_Berro":
    n_barrio = "Fuente_del_Berro"
elif barrio == "Guindalera":
    n_barrio = "Guindalera"
elif barrio == "Lista":
    n_barrio = "Lista"
elif barrio == "Castellana":
    n_barrio = "Castellana"
elif barrio == "El_Viso":
    n_barrio = "El_Viso"
elif barrio == "Prosperidad":
    n_barrio = "Prosperidad"
elif barrio == "Ciudad_Jardin":
    n_barrio = "Ciudad_Jardin"
elif barrio == "Hispanoamerica":
    n_barrio = "Hispanoamerica"
elif barrio == "Nueva_Espana":
    n_barrio = "Nueva_Espana"
elif barrio == "Castilla":
    n_barrio = "Castilla"
elif barrio == "Bellas_Vistas":
    n_barrio = "Bellas_Vistas"
elif barrio == "Cuatro_Caminos":
    n_barrio = "Cuatro_Caminos"
elif barrio == "Castillejos":
    n_barrio = "Castillejos"
elif barrio == "Almenara":
    n_barrio = "Almenara"
elif barrio == "Valdeacederas":
    n_barrio = "Valdeacederas"
elif barrio == "Berruguete":
    n_barrio = "Berruguete"
elif barrio == "Gaztambide":
    n_barrio = "Gaztambide"
elif barrio == "Arapiles":
    n_barrio = "Arapiles"
elif barrio == "Trafalgar":
    n_barrio = "Trafalgar"
elif barrio == "Alamagro":
    n_barrio = "Alamagro"
elif barrio == "Rios_Rosas":
    n_barrio = "Rios_Rosas"
elif barrio == "Vallehermoso":
    n_barrio = "Vallehermoso"
elif barrio == "El_Pardo":
    n_barrio = "El_Pardo"
elif barrio == "Fuentedelareina":
    n_barrio = "Fuentedelareina"
elif barrio == "Penagrande":
    n_barrio = "Penagrande"
elif barrio == "Pilar":
    n_barrio = "Pilar"
elif barrio == "La_Paz":
    n_barrio = "La_Paz"
elif barrio == "Valverde":
    n_barrio = "Valverde"
elif barrio == "Mirasierra":
    n_barrio = "Mirasierra"
elif barrio == "El_Goloso":
    n_barrio = "El_Goloso"
elif barrio == "Casa_de_Campo":
    n_barrio = "Casa_de_Campo"
elif barrio == "Arguelles":
    n_barrio = "Arguelles"
elif barrio == "Ciudad_Universitaria":
    n_barrio = "Ciudad_Universitaria"
elif barrio == "Valdezarza":
    n_barrio = "Valdezarza"
elif barrio == "Valdemarin":
    n_barrio = "Valdemarin"
elif barrio == "El_Plantio":
    n_barrio = "El_Plantio"
elif barrio == "Aravaca":
    n_barrio = "Aravaca"
elif barrio == "Carmenes":
    n_barrio = "Carmenes"
elif barrio == "Puerta_del_Angel":
    n_barrio = "Puerta_del_Angel"
elif barrio == "Lucero":
    n_barrio = "Lucero"
elif barrio == "Aluche":
    n_barrio = "Aluche"
elif barrio == "Campamento":
    n_barrio = "Campamento"
elif barrio == "Cuatro_Vientos":
    n_barrio = "Cuatro_Vientos"
elif barrio == "Aguilas":
    n_barrio = "Aguilas"
elif barrio == "Comillas":
    n_barrio = "Comillas"
elif barrio == "Opanel":
    n_barrio = "Opanel"
elif barrio == "San_Isidro":
    n_barrio = "San_Isidro"
elif barrio == "Vista_Alegre":
    n_barrio = "Vista_Alegre"
elif barrio == "Puerta_Bonita":
    n_barrio = "Puerta_Bonita"
elif barrio == "Buenavista":
    n_barrio = "Buenavista"
elif barrio == "Abrantes":
    n_barrio = "Abrantes"
elif barrio == "Orcasitas":
    n_barrio = "Orcasitas"
elif barrio == "Orcasur":
    n_barrio = "Orcasur"
elif barrio == "San_Fermin":
    n_barrio = "San_Fermin"
elif barrio == "Almendrales":
    n_barrio = "Almendrales"
elif barrio == "Moscardo":
    n_barrio = "Moscardo"
elif barrio == "Zofio":
    n_barrio = "Zofio"
elif barrio == "Pradolongo":
    n_barrio = "Pradolongo"
elif barrio == "Entrevias":
    n_barrio = "Entrevias"
elif barrio == "San_Diego":
    n_barrio = "San_Diego"
elif barrio == "Palomeras_Bajas":
    n_barrio = "Palomeras_Bajas"
elif barrio == "Palomeras_Sureste":
    n_barrio = "Palomeras_Sureste"
elif barrio == "Portazgo":
    n_barrio = "Portazgo"
elif barrio == "Numancia":
    n_barrio = "Numancia"
elif barrio == "Pavones":
    n_barrio = "Pavones"
elif barrio == "Horcajo":
    n_barrio = "Horcajo"
elif barrio == "Marroquina":
    n_barrio = "Marroquina"
elif barrio == "Media_Legua":
    n_barrio = "Media_Legua"
elif barrio == "Fontarron":
    n_barrio = "Fontarron"
elif barrio == "Vinateros":
    n_barrio = "Vinateros"
elif barrio == "Ventas":
    n_barrio = "Ventas"
elif barrio == "Pueblo_Nuevo":
    n_barrio = "Pueblo_Nuevo"
elif barrio == "Quintana":
    n_barrio = "Quintana"
elif barrio == "Concepcion":
    n_barrio = "Concepcion"
elif barrio == "San_Pascual":
    n_barrio = "San_Pascual"
elif barrio == "San_Juan_Bautista":
    n_barrio = "San_Juan_Bautista"
elif barrio == "Colina":
    n_barrio = "Colina"
elif barrio == "Atalaya":
    n_barrio = "Atalaya"
elif barrio == "Costillares":
    n_barrio = "Costillares"
elif barrio == "Palomas":
    n_barrio = "Palomas"
elif barrio == "Piovera":
    n_barrio = "Piovera"
elif barrio == "Canillas":
    n_barrio = "Canillas"
elif barrio == "Pinar_del_Rey":
    n_barrio = "Pinar_del_Rey"
elif barrio == "Apostol_Santiago":
    n_barrio = "Apostol_Santiago"
elif barrio == "Valdefuentes":
    n_barrio = "Valdefuentes"
elif barrio == "San_Andres":
    n_barrio = "San_Andres"
elif barrio == "San_Cristobal":
    n_barrio = "San_Cristobal"
elif barrio == "Butarque":
    n_barrio = "Butarque"
elif barrio == "Los_Rosales":
    n_barrio = "Los_Rosales"
elif barrio == "Los_Angeles":
    n_barrio = "Los_Angeles"
elif barrio == "Casco_Historico_de_Vallecas":
    n_barrio = "Casco_Historico_de_Vallecas"
elif barrio == "Santa_Eugenia":
    n_barrio = "Santa_Eugenia"
elif barrio == "Casco_Historico_de_Vicalvaro":
    n_barrio = "Casco_Historico_de_Vicalvaro"
elif barrio == "Ambroz":
    n_barrio = "Ambroz"
elif barrio == "Simancas":
    n_barrio = "Simancas"
elif barrio == "Hellin":
    n_barrio = "Hellin"
elif barrio == "Amposta":
    n_barrio = "Amposta"
elif barrio == "Arcos":
    n_barrio = "Arcos"
elif barrio == "Rosas":
    n_barrio = "Rosas"
elif barrio == "Rejas":
    n_barrio = "Rejas"
elif barrio == "Canillejas":
    n_barrio = "Canillejas"
elif barrio == "Salvador":
    n_barrio = "Salvador"
elif barrio == "Alameda_de_Osuna":
    n_barrio = "Alameda_de_Osuna"
elif barrio == "Aeropuerto":
    n_barrio = "Aeropuerto"
elif barrio == "Casco_Historico_de_Barajas":
    n_barrio = "Casco_Historico_de_Barajas"
elif barrio == "Timon":
    n_barrio = "Timon"
elif barrio == "Corralejos":
    n_barrio = "Corralejos"


#Construimos consulta sql para seleccionar delitos dependiendo de las fechas
#Hacemos FeatureLayer de la capa y hacemos una selecci?n por atributos con la consulta sql
con_sql = """"Distrito" = '{}' AND "Barrio" = '{}' AND "FECHA" > '{}' AND "FECHA" < '{}'""".format(n_distrito,n_barrio,fecha_inicial,fecha_final)
#con_sql = """"FECHA" > '{}' AND "FECHA" < '{}'""".format(fecha_inicial,fecha_final)
arcpy.MakeFeatureLayer_management(capa_delito_final,"capa_delito_final_layer")
arcpy.SelectLayerByAttribute_management("capa_delito_final_layer","NEW_SELECTION",con_sql)

#Hacemos FeatureSet con los datos seleccionados y los guardamos en memoria
arcpy.CopyFeatures_management("capa_delito_final_layer","in_memory\capa_delito_final_L")

#Establecemos la capa final como capa de salida
arcpy.SetParameter(6,"in_memory\capa_delito_final_L")
