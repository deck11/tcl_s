# tcl_s
create command(vsdsynth) and pass  .csv from UNIX shell to tcl script   



# DAY 2: 
## CSV to format[1] and SDC variable creation

1.create variables to access paths through them
2.check for existance of directories and files in .csv 
3.read constraints file for above .csv files and convert to SDC format
4.read all files in netlist directory
5.creat main synthesis scripts in format[2]
6.pass this script to yosys  
 
 
 ![Alt text](/home/deekshu/Pictures/Screenshots/Screenshot from 2023-06-17 09-03-37.png)
 
1.$argv[1] arguments to tcl script 
tclsh vsdsynth.tcl my.csv - command for passing csv file to tcl
set filename [lindex $argv 0] access first element of array
auto create variables makes the process independant of location

first make a matrix of size m*n 
then make 2d array
$my_arr(0,0) = Design Name
remove spaces in the vairialbes created(Design Name --> DesignName)
assign value to variable by 
set DesignName $my_arr(1,0)

![Alt text](/home/deekshu/Pictures/Screenshots/Screenshot from 2023-06-18 15-18-54.png)

# day3
## convert .csv file to sdc format

1.getting clock details from csv file and writing it the sdc file in the required format
2.getting input details from csv file and writing it in the required format
3.getting output details from csv file and writing it in the required format

![Alt text](/home/deekshu/Pictures/Screenshots/Screenshot from 2023-06-18 19-52-17.png)


Input and Output Constraints Generation and bits/Bussed Differentiation

![Alt text](/home/deekshu/Pictures/Screenshots/Screenshot from 2023-06-20 23-40-03.png)




























