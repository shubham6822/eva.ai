from langchain.tools import tool


@tool
def add_to_order(item: str, quantity: int) -> str:
    """Add an item to the customer's order.
    
    Args:
        item: The menu item to add (e.g., "Cappuccino", "Club Wich Sandwich")
        quantity: Number of items to add
    """
    return f"Added {quantity} x {item} to the order."


@tool
def confirm_order(order_summary: str) -> str:
    """Confirm the final order with the customer.
    
    Args:
        order_summary: A summary of all items in the order
    """
    return f"Order confirmed: {order_summary}. Sending to kitchen."