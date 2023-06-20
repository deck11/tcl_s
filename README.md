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
 
 ![Screenshot from 2023-06-17 09-03-37](https://github.com/deck11/tcl_s/assets/114303670/7e342989-df75-4632-89d9-faef2319b70f)
 
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

![Screenshot from 2023-06-18 15-18-54](https://github.com/deck11/tcl_s/assets/114303670/33e79b93-96e0-4665-9075-1364a9353581)


# day3
## convert .csv file to sdc format

1.getting clock details from csv file and writing it the sdc file in the required format
2.getting input details from csv file and writing it in the required format
3.getting output details from csv file and writing it in the required format

![Screenshot from 2023-06-18 19-52-17](https://github.com/deck11/tcl_s/assets/114303670/e3f55886-4453-4904-be24-02a03d639b0a)


Input and Output Constraints Generation and bits/Bussed Differentiation

![Screenshot from 2023-06-20 23-40-03](https://github.com/deck11/tcl_s/assets/114303670/0c7e2975-ad88-4241-a127-cef6eb533f6c)

# day4

Creating scripts for synthesis and running it on yosys
creating script for Hierarchy check and running hierarchy check

Hierachy check and error handling script creation for yosys
![Screenshot from 2023-06-20 23-58-40](https://github.com/deck11/tcl_s/assets/114303670/b35d6434-e985-47e1-b952-7973b38c1987)

no error 
![image](https://github.com/deck11/tcl_s/assets/114303670/670408df-f2ca-47f9-8810-e208007f6e91)

error 
![image](https://github.com/deck11/tcl_s/assets/114303670/a4ad0658-5492-4b12-8764-1525690883b3)

#day 5 




























