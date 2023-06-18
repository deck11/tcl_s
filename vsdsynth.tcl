#! /bin/env tclsh

#-----------------------------------------------------------#
#----- Checks whether panda usage is correct or not -----#
#-----------------------------------------------------------#

set generate_sdc 1
set enable_prelayout_timing 1
set working_dir [exec pwd]
set pan_array_length [llength [split [lindex $argv 0] .]]
set input [lindex [split [lindex $argv 0] .] $pan_array_length-1]

if {![regexp {^csv} $input] || $argc!=1 } {
	puts "Error in usage"
	puts "Usage: ./vsdsynth <.csv>"
	puts "where <.csv> file has below inputs"
	exit
} else {

set filename [lindex $argv 0]
package require csv
package require struct::matrix
struct::matrix m
set f [open $filename]
csv::read2matrix $f m , auto
close $f
set columns [m columns]
m link arr
set rows [m rows]
puts $columns
puts $rows
set i 0
while {$i < $rows} {
	puts "\n setting $arr(0,$i) as $arr(1,$i)"
	if {$i == 0} {
		set [string map {" " _} $arr(0,$i)] $arr(1,$i)
	} else {
		set [string map {" " _} $arr(0,$i)] [file normalize $arr(1,$i)]		
	}
	set i [expr {$i + 1}]
}
puts "Design name= $Design_Name"
puts "output dire= $Output_Directory"
}



if {! [file isdirectory $Output_Directory] } {
	puts "\n Info: Cannot find output directory $Output_Directory"
} else {
		puts "\n Info: Output directory found "
		} 
if {! [file exists $Early_Library_Path] } {
	puts "\n Info: Cannot find early lib path $Early_Library_Path"} else {
		puts "\n Info: early lib path found "
		} 
if {! [file exists $Late_Library_Path] } {
	puts "\n Info: Cannot find late_lib_path $Late_Library_Path"} else {
		puts "\n Info: Late_Lib_Path found "
		} 
if {! [file isdirectory $Netlist_Directory] } {
	puts "\n Info: Cannot find Netlist_Directory $Netlist_Directory"} else {
		puts "\n Info: netlist found "
		} 



puts "\nInfo: Dumping SDC constraints for $Design_Name"
::struct::matrix constraints
set chan [open $Constraints_File]
csv::read2matrix $chan constraints  , auto
close $chan
set number_of_rows [constraints rows]
puts "number of rows = $number_of_rows"
set number_of_columns [constraints columns]
puts "number of cols = $number_of_columns"

#-----check row number for "clocks" and column number for "IO delays and slew section" in constraints.csv---##
set clock_start [lindex [lindex [constraints search all CLOCKS] 0 ] 1]
set clock_start_column [lindex [lindex [constraints search all CLOCKS] 0 ] 0]
set clock_period [constraints get cell [expr {$clock_start+1}] [expr {$clock_start_column+1}]]
puts "clk start = $clock_start"


#-----check row number for "inputs" section in constraints.csv---##
set input_ports_start [lindex [lindex [constraints search all INPUTS] 0 ] 1]
puts "ip port start = $input_ports_start"

#-----check row number for "outputs" section in constraints.csv---##
set output_ports_start [lindex [lindex [constraints search all OUTPUTS] 0 ] 1]
puts "op port start = $output_ports_start"

return






















