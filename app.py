import streamlit as st
import math

def celsius_to_fahrenheit(celsius: float) -> float:
    """
    Converts a temperature from Celsius to Fahrenheit with strict validation.
    """
    if not isinstance(celsius, (int, float)):
        raise TypeError(f"Input must be a number, not {type(celsius).__name__}")

    if not math.isfinite(celsius):
        raise ValueError("Temperature must be a finite number.")

    ABSOLUTE_ZERO_CELSIUS = -273.15
    if celsius < ABSOLUTE_ZERO_CELSIUS:
        raise ValueError(f"Temperature {celsius}°C is below absolute zero ({ABSOLUTE_ZERO_CELSIUS}°C).")

    return (celsius * 9/5) + 32

def main():
    # Page configuration for a professional look
    st.set_page_config(page_title="TempConvert Pro", page_icon="🌡️")
    
    st.title("🌡️ Celsius to Fahrenheit Converter")
    st.write("Enter a temperature in Celsius to see its equivalent in Fahrenheit.")

    # User Input
    # We use a number_input for better UX, but the function still validates types
    celsius_input = st.number_input(
        "Temperature in Celsius (°C):", 
        value=0.0, 
        step=0.1,
        format="%.2f"
    )

    if st.button("Convert", type="primary"):
        try:
            # Interaction with the core logic
            fahrenheit = celsius_to_fahrenheit(celsius_input)
            
            # Displaying the result with success styling
            st.success(f"### {celsius_input}°C is equal to {fahrenheit:.2f}°F")
            
            # Adding a visual metric for clarity
            st.metric(label="Fahrenheit Result", value=f"{fahrenheit:.2f} °F", delta=f"{fahrenheit - celsius_input:.2f} diff")

        except ValueError as e:
            # Handling physical limit or math errors gracefully in the UI
            st.error(f"**Validation Error:** {e}")
        except Exception as e:
            # Catch-all for unexpected issues
            st.error(f"An unexpected error occurred: {e}")

    # Sidebar for additional info
    st.sidebar.info("This tool uses absolute zero validation (-273.15°C) to ensure scientific accuracy.")

if __name__ == "__main__":
    main()
