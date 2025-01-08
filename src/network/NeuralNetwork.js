import {
  random,
  multiply,
  dotMultiply,
  mean,
  abs,
  subtract,
  transpose,
  add,
} from "mathjs";
import * as activation from "./activations";

export class NeuralNetwork {
  constructor(...args) {
    this.input_nodes = args[0]; //number of input neurons
    this.hidden_nodes = args[1]; //number of hidden neurons
    this.output_nodes = args[2]; //number of output neurons
    this.epochs = 50;
    this.activation = activation.sigmoid;
    this.lr = 0.5; //learning rate
    this.output = 0;

    this.weights0 = random([args[0], args[1]], -1.0, 1.0); //connections from input layer to hiden
    this.weights1 = random([args[1], args[2]], -1.0, 1.0); //connections from hidden layer to output
  }

  train(input, target) {
    for (let i = 0; i < this.epochs; i++) {
      // Forward pass
      let input_layer = input; // Input data
      let hidden_layer = multiply(input_layer, this.weights0).map((v) =>
        this.activation(v, false)
      ); // Output of hidden layer neurons (matrix!)

      let output_layer = multiply(hidden_layer, this.weights1).map((v) =>
        this.activation(v, false)
      ); // Output of output layer neurons (matrix!)

      // Backward pass (Backpropagation)
      let output_error = subtract(target, output_layer); // Calculating error (matrix!)
      let output_delta = dotMultiply(
        output_error,
        output_layer.map((v) => this.activation(v, true)) // Derivative of activation
      ); // Calculating delta for the output layer (vector!)

      let hidden_error = multiply(output_delta, transpose(this.weights1)); // Calculating error of hidden layer neurons (matrix!)
      let hidden_delta = dotMultiply(
        hidden_error,
        hidden_layer.map((v) => this.activation(v, true)) // Derivative of activation for hidden layer
      ); // Calculating delta for the hidden layer (vector!)

      // Gradient descent (Weight updates)
      this.weights1 = add(
        this.weights1,
        multiply(transpose(output_layer), multiply(output_delta, this.lr)) // Update weights between hidden and output layers
      );
      this.weights0 = add(
        this.weights0,
        multiply(transpose(hidden_layer), multiply(hidden_delta, this.lr)) // Update weights between input and hidden layers
      );

      this.output = output_layer;

      if (i % 10000 == 0) {
        console.log(`Error: ${mean(abs(output_error))}`);
      }
    }
  }

  predict(input) {
    let input_layer = input;
    console.log(input_layer);
    console.log(this.weights0);
    let hidden_layer = multiply(input_layer, this.weights0).map((v) =>
      this.activation(v, false)
    );
    let output_layer = multiply(hidden_layer, this.weights1).map((v) =>
      this.activation(v, false)
    );
    return output_layer;
  }
}
