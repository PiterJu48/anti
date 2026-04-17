$Excel = New-Object -ComObject Excel.Application
$Workbook = $Excel.Workbooks.Open("D:\works\anti\mafra.xlsx")
$Workbook.SaveAs("D:\works\anti\mafra.csv", 6)
$Workbook.Close($false)
$Excel.Quit()
