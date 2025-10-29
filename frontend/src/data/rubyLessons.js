export const rubyLessons = [
  {
    id: 'ruby-basics',
    title: 'Ruby Basics',
    description: 'Learn the fundamentals of Ruby programming',
    lessons: [
      {
        id: 'intro',
        title: 'Introduction to Ruby',
        content: `# Welcome to Ruby!

Ruby is a dynamic, object-oriented programming language focused on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.

## Your First Ruby Program

Let's start with the traditional "Hello, World!" program:

\`\`\`ruby
puts "Hello, World!"
\`\`\`

The \`puts\` method prints text to the console followed by a new line.

## Try it yourself!

Run the code in the editor on the right. You'll see the output below the editor.`,
        starterCode: 'puts "Hello, World!"',
        solution: 'puts "Hello, World!"',
        type: 'tutorial'
      },
      {
        id: 'variables',
        title: 'Variables and Data Types',
        content: `# Variables in Ruby

Variables in Ruby are used to store data. You don't need to declare the type of a variable - Ruby figures it out automatically!

## Variable Assignment

\`\`\`ruby
name = "Alice"
age = 25
height = 5.6
is_student = true
\`\`\`

## Common Data Types

- **String**: Text data, e.g., \`"Hello"\`
- **Integer**: Whole numbers, e.g., \`42\`
- **Float**: Decimal numbers, e.g., \`3.14\`
- **Boolean**: \`true\` or \`false\`
- **Symbol**: Immutable identifiers, e.g., \`:name\`

## String Interpolation

You can embed variables in strings using \`#{}\`:

\`\`\`ruby
name = "Bob"
puts "Hello, #{name}!"  # Output: Hello, Bob!
\`\`\``,
        starterCode: `name = "Your Name"
age = 25

# Print a message with your name and age
`,
        solution: `name = "Your Name"
age = 25
puts "My name is #{name} and I am #{age} years old."`,
        type: 'tutorial'
      },
      {
        id: 'variables-exercise',
        title: 'Exercise: Working with Variables',
        content: `# Exercise: Create and Use Variables

Create variables and perform operations with them.

## Task

1. Create a variable \`first_name\` with your first name
2. Create a variable \`last_name\` with your last name
3. Create a variable \`full_name\` that combines both
4. Print the full name

Example output: "John Doe"`,
        starterCode: `# Create your variables here
first_name =
last_name =
full_name =

# Print the full name
`,
        solution: `first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
puts full_name`,
        tests: `
# Test cases
raise "first_name should be defined" unless defined?(first_name)
raise "last_name should be defined" unless defined?(last_name)
raise "full_name should be defined" unless defined?(full_name)
raise "full_name should contain a space" unless full_name.include?(" ")
puts "✓ All tests passed!"
`,
        type: 'exercise'
      },
      {
        id: 'numbers',
        title: 'Numbers and Math',
        content: `# Working with Numbers

Ruby makes it easy to work with numbers and perform mathematical operations.

## Basic Arithmetic

\`\`\`ruby
# Addition
10 + 5   # => 15

# Subtraction
10 - 5   # => 5

# Multiplication
10 * 5   # => 50

# Division
10 / 5   # => 2

# Modulo (remainder)
10 % 3   # => 1

# Exponentiation
2 ** 3   # => 8
\`\`\`

## Integer vs Float Division

\`\`\`ruby
10 / 3      # => 3 (integer division)
10.0 / 3    # => 3.333... (float division)
10 / 3.0    # => 3.333... (float division)
\`\`\`

## Useful Methods

\`\`\`ruby
-5.abs      # => 5 (absolute value)
3.14.round  # => 3 (rounding)
3.14.ceil   # => 4 (ceiling)
3.14.floor  # => 3 (floor)
\`\`\``,
        starterCode: `# Try some math operations
a = 10
b = 3

puts a + b
puts a - b
puts a * b
puts a / b
puts a % b
`,
        solution: `a = 10
b = 3
puts a + b
puts a - b
puts a * b
puts a / b
puts a % b`,
        type: 'tutorial'
      },
      {
        id: 'numbers-exercise',
        title: 'Exercise: Temperature Converter',
        content: `# Exercise: Convert Celsius to Fahrenheit

Write code to convert a temperature from Celsius to Fahrenheit.

## Formula

\`\`\`
fahrenheit = (celsius * 9.0 / 5.0) + 32
\`\`\`

## Task

Convert 25 degrees Celsius to Fahrenheit and store it in a variable called \`fahrenheit\`.`,
        starterCode: `celsius = 25

# Convert to Fahrenheit
fahrenheit =

puts fahrenheit
`,
        solution: `celsius = 25
fahrenheit = (celsius * 9.0 / 5.0) + 32
puts fahrenheit`,
        tests: `
# Test cases
celsius = 25
fahrenheit = (celsius * 9.0 / 5.0) + 32
raise "fahrenheit should be 77.0" unless fahrenheit == 77.0

celsius = 0
fahrenheit = (celsius * 9.0 / 5.0) + 32
raise "0°C should be 32°F" unless fahrenheit == 32.0

puts "✓ All tests passed!"
`,
        type: 'exercise'
      },
      {
        id: 'strings',
        title: 'String Methods',
        content: `# Working with Strings

Strings in Ruby have many useful methods for manipulation.

## Common String Methods

\`\`\`ruby
text = "Hello, World!"

text.length        # => 13
text.upcase        # => "HELLO, WORLD!"
text.downcase      # => "hello, world!"
text.reverse       # => "!dlroW ,olleH"
text.include?("World")  # => true
\`\`\`

## String Manipulation

\`\`\`ruby
# Concatenation
"Hello" + " " + "World"  # => "Hello World"

# Repetition
"Ha" * 3  # => "HaHaHa"

# Substring
"Hello"[0]     # => "H"
"Hello"[0..2]  # => "Hel"
\`\`\`

## Trimming and Splitting

\`\`\`ruby
"  hello  ".strip     # => "hello"
"a,b,c".split(",")    # => ["a", "b", "c"]
\`\`\``,
        starterCode: `text = "ruby programming"

# Try different string methods
puts text.upcase
puts text.capitalize
puts text.reverse
puts text.length
`,
        solution: `text = "ruby programming"
puts text.upcase
puts text.capitalize
puts text.reverse
puts text.length`,
        type: 'tutorial'
      },
      {
        id: 'strings-exercise',
        title: 'Exercise: String Manipulation',
        content: `# Exercise: Format a Name

Write code that takes a name in lowercase and formats it properly.

## Task

1. Take the input string \`name = "john doe"\`
2. Create a variable \`formatted_name\` that capitalizes each word
3. Print the formatted name

Expected output: "John Doe"

Hint: Use \`.split\`, \`.capitalize\`, and \`.join\` methods`,
        starterCode: `name = "john doe"

# Format the name
formatted_name =

puts formatted_name
`,
        solution: `name = "john doe"
formatted_name = name.split.map(&:capitalize).join(" ")
puts formatted_name`,
        tests: `
# Test cases
name = "john doe"
formatted_name = name.split.map(&:capitalize).join(" ")
raise "formatted_name should be 'John Doe'" unless formatted_name == "John Doe"

name = "alice smith"
formatted_name = name.split.map(&:capitalize).join(" ")
raise "Should capitalize each word" unless formatted_name == "Alice Smith"

puts "✓ All tests passed!"
`,
        type: 'exercise'
      }
    ]
  },
  {
    id: 'ruby-control-flow',
    title: 'Control Flow',
    description: 'Learn about conditionals and loops in Ruby',
    lessons: [
      {
        id: 'conditionals',
        title: 'If Statements',
        content: `# Conditional Statements

Conditionals allow your program to make decisions.

## If, Elsif, Else

\`\`\`ruby
age = 18

if age >= 18
  puts "You are an adult"
elsif age >= 13
  puts "You are a teenager"
else
  puts "You are a child"
end
\`\`\`

## Comparison Operators

- \`==\` equal to
- \`!=\` not equal to
- \`>\` greater than
- \`<\` less than
- \`>=\` greater than or equal to
- \`<=\` less than or equal to

## Unless Statement

\`\`\`ruby
unless tired
  puts "Let's go for a walk!"
end
# Equivalent to: if !tired
\`\`\`

## Inline Conditionals

\`\`\`ruby
puts "Adult" if age >= 18
puts "Not tired" unless tired
\`\`\``,
        starterCode: `age = 25

if age >= 18
  puts "You can vote!"
else
  puts "You cannot vote yet"
end
`,
        solution: `age = 25
if age >= 18
  puts "You can vote!"
else
  puts "You cannot vote yet"
end`,
        type: 'tutorial'
      },
      {
        id: 'conditionals-exercise',
        title: 'Exercise: Grade Calculator',
        content: `# Exercise: Calculate Letter Grade

Write a program that converts a numeric score to a letter grade.

## Grading Scale

- 90-100: A
- 80-89: B
- 70-79: C
- 60-69: D
- Below 60: F

## Task

Create a variable \`grade\` based on the \`score\` variable.`,
        starterCode: `score = 85

# Calculate the grade
grade =

puts "Your grade is: #{grade}"
`,
        solution: `score = 85

if score >= 90
  grade = "A"
elsif score >= 80
  grade = "B"
elsif score >= 70
  grade = "C"
elsif score >= 60
  grade = "D"
else
  grade = "F"
end

puts "Your grade is: #{grade}"`,
        tests: `
# Test cases
score = 95
grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F"
raise "Score 95 should be grade A" unless grade == "A"

score = 85
grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F"
raise "Score 85 should be grade B" unless grade == "B"

score = 55
grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : score >= 60 ? "D" : "F"
raise "Score 55 should be grade F" unless grade == "F"

puts "✓ All tests passed!"
`,
        type: 'exercise'
      },
      {
        id: 'loops',
        title: 'Loops',
        content: `# Loops in Ruby

Loops allow you to repeat code multiple times.

## While Loop

\`\`\`ruby
count = 0
while count < 5
  puts count
  count += 1
end
\`\`\`

## Until Loop

\`\`\`ruby
count = 0
until count == 5
  puts count
  count += 1
end
\`\`\`

## For Loop

\`\`\`ruby
for i in 1..5
  puts i
end
\`\`\`

## Times Loop

\`\`\`ruby
5.times do |i|
  puts i
end
\`\`\`

## Loop Control

- \`break\` - exit the loop
- \`next\` - skip to next iteration
- \`redo\` - restart current iteration`,
        starterCode: `# Print numbers 1 to 5
5.times do |i|
  puts i + 1
end

# Print even numbers from 0 to 10
(0..10).each do |num|
  puts num if num.even?
end
`,
        solution: `5.times do |i|
  puts i + 1
end

(0..10).each do |num|
  puts num if num.even?
end`,
        type: 'tutorial'
      },
      {
        id: 'loops-exercise',
        title: 'Exercise: FizzBuzz',
        content: `# Exercise: FizzBuzz

Write a program that prints numbers from 1 to 15, but:
- For multiples of 3, print "Fizz" instead of the number
- For multiples of 5, print "Buzz" instead of the number
- For multiples of both 3 and 5, print "FizzBuzz"

## Expected Output

1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`,
        starterCode: `# Write your FizzBuzz solution here
(1..15).each do |num|

end
`,
        solution: `(1..15).each do |num|
  if num % 15 == 0
    puts "FizzBuzz"
  elsif num % 3 == 0
    puts "Fizz"
  elsif num % 5 == 0
    puts "Buzz"
  else
    puts num
  end
end`,
        tests: `
# Test FizzBuzz logic
def fizzbuzz(n)
  if n % 15 == 0
    "FizzBuzz"
  elsif n % 3 == 0
    "Fizz"
  elsif n % 5 == 0
    "Buzz"
  else
    n.to_s
  end
end

raise "3 should be Fizz" unless fizzbuzz(3) == "Fizz"
raise "5 should be Buzz" unless fizzbuzz(5) == "Buzz"
raise "15 should be FizzBuzz" unless fizzbuzz(15) == "FizzBuzz"
raise "7 should be 7" unless fizzbuzz(7) == "7"

puts "✓ All tests passed!"
`,
        type: 'exercise'
      }
    ]
  },
  {
    id: 'ruby-collections',
    title: 'Arrays and Hashes',
    description: 'Work with collections of data',
    lessons: [
      {
        id: 'arrays',
        title: 'Arrays',
        content: `# Arrays in Ruby

Arrays are ordered collections of objects.

## Creating Arrays

\`\`\`ruby
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]
mixed = [1, "hello", true, 3.14]
empty = []
\`\`\`

## Accessing Elements

\`\`\`ruby
numbers[0]     # => 1 (first element)
numbers[-1]    # => 5 (last element)
numbers[1..3]  # => [2, 3, 4] (range)
\`\`\`

## Common Array Methods

\`\`\`ruby
arr = [1, 2, 3]

arr.push(4)      # => [1, 2, 3, 4]
arr << 5         # => [1, 2, 3, 4, 5]
arr.pop          # => 5, arr is now [1, 2, 3, 4]
arr.length       # => 4
arr.include?(2)  # => true
arr.reverse      # => [4, 3, 2, 1]
\`\`\``,
        starterCode: `fruits = ["apple", "banana", "orange"]

# Add a fruit
fruits << "grape"

# Print all fruits
fruits.each do |fruit|
  puts fruit
end

# Print array info
puts "Total fruits: #{fruits.length}"
puts "First fruit: #{fruits.first}"
puts "Last fruit: #{fruits.last}"
`,
        solution: `fruits = ["apple", "banana", "orange"]
fruits << "grape"
fruits.each do |fruit|
  puts fruit
end
puts "Total fruits: #{fruits.length}"
puts "First fruit: #{fruits.first}"
puts "Last fruit: #{fruits.last}"`,
        type: 'tutorial'
      },
      {
        id: 'arrays-exercise',
        title: 'Exercise: Array Operations',
        content: `# Exercise: Working with Arrays

Perform various operations on an array of numbers.

## Task

1. Create an array \`numbers\` with values [3, 7, 1, 9, 2]
2. Sort the array and store in \`sorted_numbers\`
3. Find the sum of all numbers and store in \`sum\`
4. Find the average and store in \`average\`
5. Print all the results`,
        starterCode: `numbers = [3, 7, 1, 9, 2]

# Sort the numbers
sorted_numbers =

# Calculate sum
sum =

# Calculate average
average =

puts "Sorted: #{sorted_numbers}"
puts "Sum: #{sum}"
puts "Average: #{average}"
`,
        solution: `numbers = [3, 7, 1, 9, 2]
sorted_numbers = numbers.sort
sum = numbers.sum
average = sum / numbers.length.to_f

puts "Sorted: #{sorted_numbers}"
puts "Sum: #{sum}"
puts "Average: #{average}"`,
        tests: `
# Test cases
numbers = [3, 7, 1, 9, 2]
sorted_numbers = numbers.sort
sum = numbers.sum
average = sum / numbers.length.to_f

raise "sorted_numbers should be [1, 2, 3, 7, 9]" unless sorted_numbers == [1, 2, 3, 7, 9]
raise "sum should be 22" unless sum == 22
raise "average should be 4.4" unless average == 4.4

puts "✓ All tests passed!"
`,
        type: 'exercise'
      },
      {
        id: 'hashes',
        title: 'Hashes',
        content: `# Hashes in Ruby

Hashes are collections of key-value pairs.

## Creating Hashes

\`\`\`ruby
person = {
  "name" => "Alice",
  "age" => 30,
  "city" => "New York"
}

# Or using symbols (more common)
person = {
  name: "Alice",
  age: 30,
  city: "New York"
}
\`\`\`

## Accessing Values

\`\`\`ruby
person[:name]   # => "Alice"
person[:age]    # => 30
\`\`\`

## Modifying Hashes

\`\`\`ruby
person[:email] = "alice@example.com"  # Add
person[:age] = 31                      # Update
person.delete(:city)                   # Remove
\`\`\`

## Common Hash Methods

\`\`\`ruby
person.keys      # => [:name, :age, :city]
person.values    # => ["Alice", 30, "New York"]
person.has_key?(:name)  # => true
person.length    # => 3
\`\`\``,
        starterCode: `# Create a hash for a book
book = {
  title: "Ruby Programming",
  author: "John Doe",
  year: 2023,
  pages: 350
}

# Access values
puts "Title: #{book[:title]}"
puts "Author: #{book[:author]}"

# Add new key
book[:isbn] = "978-1234567890"

# Iterate over hash
book.each do |key, value|
  puts "#{key}: #{value}"
end
`,
        solution: `book = {
  title: "Ruby Programming",
  author: "John Doe",
  year: 2023,
  pages: 350
}

puts "Title: #{book[:title]}"
puts "Author: #{book[:author]}"

book[:isbn] = "978-1234567890"

book.each do |key, value|
  puts "#{key}: #{value}"
end`,
        type: 'tutorial'
      }
    ]
  },
  {
    id: 'ruby-methods',
    title: 'Methods',
    description: 'Create reusable code with methods',
    lessons: [
      {
        id: 'defining-methods',
        title: 'Defining Methods',
        content: `# Methods in Ruby

Methods are reusable blocks of code that perform specific tasks.

## Basic Method Definition

\`\`\`ruby
def greet
  puts "Hello!"
end

greet  # Call the method
\`\`\`

## Methods with Parameters

\`\`\`ruby
def greet(name)
  puts "Hello, #{name}!"
end

greet("Alice")  # => Hello, Alice!
\`\`\`

## Methods with Default Parameters

\`\`\`ruby
def greet(name = "Guest")
  puts "Hello, #{name}!"
end

greet          # => Hello, Guest!
greet("Bob")   # => Hello, Bob!
\`\`\`

## Return Values

\`\`\`ruby
def add(a, b)
  a + b  # Implicit return (last line)
end

result = add(5, 3)  # => 8

# Explicit return
def subtract(a, b)
  return a - b
end
\`\`\``,
        starterCode: `# Define a method to calculate area of rectangle
def rectangle_area(length, width)
  length * width
end

# Call the method
area = rectangle_area(5, 3)
puts "Area: #{area}"

# Method with default parameter
def greet(name = "Friend")
  "Hello, #{name}!"
end

puts greet
puts greet("Ruby")
`,
        solution: `def rectangle_area(length, width)
  length * width
end

area = rectangle_area(5, 3)
puts "Area: #{area}"

def greet(name = "Friend")
  "Hello, #{name}!"
end

puts greet
puts greet("Ruby")`,
        type: 'tutorial'
      },
      {
        id: 'methods-exercise',
        title: 'Exercise: Create a Calculator',
        content: `# Exercise: Build a Simple Calculator

Create methods for basic arithmetic operations.

## Task

Define four methods:
1. \`add(a, b)\` - returns sum of a and b
2. \`subtract(a, b)\` - returns difference of a and b
3. \`multiply(a, b)\` - returns product of a and b
4. \`divide(a, b)\` - returns quotient of a and b (as float)

Test your methods with the provided test cases.`,
        starterCode: `# Define your calculator methods here

def add(a, b)

end

def subtract(a, b)

end

def multiply(a, b)

end

def divide(a, b)

end

# Test your methods
puts add(10, 5)
puts subtract(10, 5)
puts multiply(10, 5)
puts divide(10, 5)
`,
        solution: `def add(a, b)
  a + b
end

def subtract(a, b)
  a - b
end

def multiply(a, b)
  a * b
end

def divide(a, b)
  a / b.to_f
end

puts add(10, 5)
puts subtract(10, 5)
puts multiply(10, 5)
puts divide(10, 5)`,
        tests: `
# Test cases
def add(a, b)
  a + b
end

def subtract(a, b)
  a - b
end

def multiply(a, b)
  a * b
end

def divide(a, b)
  a / b.to_f
end

raise "add(10, 5) should be 15" unless add(10, 5) == 15
raise "subtract(10, 5) should be 5" unless subtract(10, 5) == 5
raise "multiply(10, 5) should be 50" unless multiply(10, 5) == 50
raise "divide(10, 5) should be 2.0" unless divide(10, 5) == 2.0
raise "divide(10, 3) should be float" unless divide(10, 3).is_a?(Float)

puts "✓ All tests passed!"
`,
        type: 'exercise'
      }
    ]
  }
];
