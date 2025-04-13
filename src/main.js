import './style.css'

// Make W_VerticalStack elements in the same parent take equal width
function equalizeVerticalStackWidths() {
  // Only apply when viewport is wider than 1023px
  if (window.innerWidth > 1023) {
    let parents = document.querySelectorAll('.O_Company, .O_Form');
    
    parents.forEach(parent => {
      const stacks = parent.querySelectorAll('.W_VerticalStack, .W_FormPart');
      if (stacks.length > 1) {
        const halfWidth = Math.floor(document.documentElement.clientWidth / 2) + 'px';
        stacks.forEach(stack => {
          stack.style.width = halfWidth;
          stack.style.minWidth = halfWidth;
          stack.style.maxWidth = halfWidth;
        });
      }
    });
  } else {
    let parents = document.querySelectorAll('.O_Company, .O_Form');
    
    parents.forEach(parent => {
      const stacks = parent.querySelectorAll('.W_VerticalStack, .W_FormPart');
      if (stacks.length > 1) {
        stacks.forEach(stack => {
          stack.style.width = '100%';
          stack.style.minWidth = '100%';
          stack.style.maxWidth = '100%';
        });
      }
    });
  }
}

// Set height of Q_Divider elements to match their parent elements
function setDividerHeights() {
  const dividers = document.querySelectorAll('.Q_Divider');
  
  dividers.forEach(divider => {
    const parent = divider.parentElement;
    divider.style.height = '1px';
    if (parent) {
      divider.style.height = `${parent.clientHeight}px`;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Run both functions on page load
  setDividerHeights();
  equalizeVerticalStackWidths();
  
  // Run on window resize
  window.addEventListener('resize', () => {
    setDividerHeights();
    equalizeVerticalStackWidths();
  });

  // Handle toggle items click
  const toggleContainers = document.querySelectorAll('.W_Toggle');
  
  toggleContainers.forEach((container, containerIndex) => {
    const toggleItems = container.querySelectorAll('.W_ToggleItem');
    const toggleBG = container.querySelector('.Q_ToggleBG');
    const BlackBackground = document.querySelector('.W_BlackBackground');
    
    if (toggleItems.length && toggleBG) {
      // Set initial position (first item selected by default)
      toggleBG.style.left = '0';
      toggleBG.style.right = 'auto';
      toggleItems[0].classList.add('active');
      
      // For the first toggle container, set initial class
      if (containerIndex === 0 && BlackBackground) {
        BlackBackground.classList.add('U_Kuvekino');
      }
      
      // Function to update toggle item text based on screen size
      const updateToggleText = () => {
        if (window.innerWidth <= 1023) { // Adjust breakpoint as needed
          toggleItems[1].textContent = 'Парк Балашиха';
          toggleItems[0].textContent = 'Парк Кувекино';
        } else {
          toggleItems[1].textContent = 'Промышленный парк Балашиха';
          toggleItems[0].textContent = 'Промышленный парк Кувекино';
        }
      };

      // Initial text update
      updateToggleText();
      
      // Update text on window resize
      window.addEventListener('resize', updateToggleText);
      
      toggleItems.forEach((item, index) => {
        item.addEventListener('click', () => {
          // Remove active class from all items in this toggle
          toggleItems.forEach(i => i.classList.remove('active'));
          
          // Add active class to clicked item
          item.classList.add('active');
          
          // Move background based on which item was clicked
          if (index === 0) {
            toggleBG.style.left = '0';
            toggleBG.style.right = 'auto';
          } else {
            toggleBG.style.left = '50%';
            toggleBG.style.right = 'auto';
          }

          // For the first toggle container, handle class and text changes
          if (containerIndex === 0 && BlackBackground) {
            // Toggle classes
            BlackBackground.classList.remove('U_Kuvekino', 'U_Balashiha');
            BlackBackground.classList.add(index === 0 ? 'U_Kuvekino' : 'U_Balashiha');

            // Update text content based on selection
            const textElements = {
              'U_Kuvekino': {
                transport: '20 МИН, на транспорте до м. Троицк (2029 г.)',
                address: 'Московская область, городской округ Троицк',
                text3: '30 МИН, на транспорте до м. ольховная',
                text4: '10 км до варшавского шоссе',
                text5: '5 км до калужского шоссе',
              },
              'U_Balashiha': {
                transport: 'прямой заезд и выезд на м-7. Рядом трасса М-12',
                address: 'Московская область, городской округ балашиха',
                text3: '15 мин до ж/д станции Балашиха',
                text4: '250 м – остановка общественного транспорта',
                text5: '20 мин до м. Новогиреево',
              }
            };

            // Update the text content
            const selectedClass = index === 0 ? 'U_Kuvekino' : 'U_Balashiha';
            const texts = textElements[selectedClass];
            
            // Update transport text
            const transportText = document.querySelector('.A_RowText:first-child');
            const text3 = document.querySelector('.A_RowText:nth-child(2)');
            const text4 = document.querySelector('.A_RowText:nth-child(3)');
            const text5 = document.querySelector('.A_RowText:nth-child(4)');
            if (transportText) {
              transportText.textContent = texts.transport;
            }
            if (text3) {
              text3.textContent = texts.text3;
            }
            if (text4) {
              text4.textContent = texts.text4;
            }
            if (text5) {
              text5.textContent = texts.text5;
            }
            // Update address text
            const addressText = document.querySelector('.A_SmallTitle.U_ProjectColor');
            if (addressText) {
              addressText.textContent = texts.address;
            }
          }
          
          // For the second toggle container, update table values
          if (containerIndex === 1) {
            // Table values for each location
            const tableValues = {
              'Kuvekino': {
                // Location info table
                direction: 'ЮГ',
                district: 'Троицк',
                distance: '16/20',

                // Building specs table
                buildingClass: 'A',
                status: 'Строящийся объект',
                yearBuilt: '2026',
                floors: '1',
                floorLoad: '8 т/м²',
                workingHeight: '12.5 м',
                columnSpacing: '12x24 м',
                mezzanine: 'да',
                electricity: 'от 15 вт / м²',
                communications: 'центральные',
                sprinkler: 'Да',
                management: 'Да'
                
              },
              'Balashiha': {
                // Location info table
                direction: 'Восток',
                district: 'Балашиха',
                distance: '15/38',

                // Building specs table
                buildingClass: 'A',
                status: 'Строящийся объект',
                yearBuilt: '2026',
                floors: '1',
                floorLoad: '8 т/м²',
                workingHeight: '12.5 м',
                columnSpacing: '12x24 м',
                mezzanine: 'да',
                electricity: 'от 15 вт / м²',
                communications: 'центральные и собственные',
                sprinkler: 'Да',
                management: 'Да'                
              }
            };
            
            // Get the data for the selected location
            const locationData = index === 0 ? tableValues.Kuvekino : tableValues.Balashiha;
            
            // Update first table (Location info)
            const locationTable = document.querySelectorAll('.W_Tables .W_TableAndImages')[0];
            if (locationTable) {
              // Направление
              const directionValue = locationTable.querySelector('.A_TablePoint:nth-child(1) .A_TableContent:last-child');
              if (directionValue) directionValue.textContent = locationData.direction;
              
              // Район
              const districtValue = locationTable.querySelector('.A_TablePoint:nth-child(2) .A_TableContent:last-child');
              if (districtValue) districtValue.textContent = locationData.district;
              
              // Расстояние до мкад/цкад в км
              const distanceValue = locationTable.querySelector('.A_TablePoint:nth-child(3) .A_TableContent:last-child');
              if (distanceValue) distanceValue.textContent = locationData.distance;
            }
            
            // Update second table (Building specs)
            const specsTable = document.querySelectorAll('.W_Tables .W_TableAndImages')[1];
            if (specsTable) {
              // Get all table points
              const tablePoints = specsTable.querySelectorAll('.A_TablePoint');
              
              // Map table points to their respective values
              const valueMap = {
                0: 'buildingClass',      // Класс
                1: 'status',             // Статус
                2: 'yearBuilt',          // Год постройки
                3: 'floors',             // Этажность
                4: 'floorLoad',          // Нагрузка на пол
                5: 'workingHeight',      // Рабочая высота
                6: 'columnSpacing',      // Шаг колонн
                7: 'mezzanine',          // Наличие мезонина
                8: 'electricity',        // Электричество
                9: 'communications',     // Коммуникации
                10: 'sprinkler',         // Спринклерная система
                11: 'management',         // Наличие управляющей компании
              };
              
              // Update each table point
              tablePoints.forEach((point, i) => {
                if (valueMap[i]) {
                  const valueCell = point.querySelector('.A_TableContent:last-child');
                  if (valueCell) {
                    valueCell.textContent = locationData[valueMap[i]];
                  }
                }
              });
            }

            // Try a different approach if the above didn't work
            // More targeted approach to update specs table
            document.querySelectorAll('.W_TableWithTitle').forEach(table => {
              const title = table.querySelector('.A_Subtitle');
              
              // Check if this is the specs table
              if (title && title.textContent.includes('Характеристики объекта')) {
                const allTablePoints = table.querySelectorAll('.A_TablePoint');
                
                // Update each field by matching its label text
                allTablePoints.forEach(point => {
                  const label = point.querySelector('.A_TableContent:first-child');
                  const value = point.querySelector('.A_TableContent:last-child');
                  
                  if (label && value) {
                    const labelText = label.textContent.trim();
                    
                    // Match label text to corresponding data field
                    if (labelText.includes('Класс')) {
                      value.textContent = locationData.buildingClass;
                    } else if (labelText.includes('Статус')) {
                      value.textContent = locationData.status;
                    } else if (labelText.includes('Год постройки')) {
                      value.textContent = locationData.yearBuilt;
                    } else if (labelText.includes('Этажность')) {
                      value.textContent = locationData.floors;
                    } else if (labelText.includes('Нагрузка на пол')) {
                      value.textContent = locationData.floorLoad;
                    } else if (labelText.includes('Рабочая высота')) {
                      value.textContent = locationData.workingHeight;
                    } else if (labelText.includes('Шаг колонн')) {
                      value.textContent = locationData.columnSpacing;
                    } else if (labelText.includes('Наличие мезонина')) {
                      value.textContent = locationData.mezzanine;
                    } else if (labelText.includes('Электричество')) {
                      value.textContent = locationData.electricity;
                    } else if (labelText.includes('Коммуникации')) {
                      value.textContent = locationData.communications;
                    } else if (labelText.includes('Спринклерная система')) {
                      value.textContent = locationData.sprinkler;
                    } else if (labelText.includes('Наличие управляющей компании')) {
                      value.textContent = locationData.management;
                    }
                  }
                });
              }
            });
          }
        });
      });
    }
  });

  let burgerMenu = document.querySelector('.O_BurgerMenu')
  let burgerMenuList = document.querySelector('.W_BurgerMenuList')
  document.querySelector('.A_BurgerMenuButton').addEventListener('click', function () {
      burgerMenu.classList.add('U_Open')
      burgerMenuList.classList.add('U_BurgerMenuListOpen')
  })
  document.querySelector('.A_BurgerCloseButton').addEventListener('click', function () {
      burgerMenu.classList.remove('U_Open')
      burgerMenuList.classList.remove('U_BurgerMenuListOpen')
  })
  let allBurgerMenuLinks = document.querySelectorAll('.U_LinkToOffer')
  allBurgerMenuLinks.forEach(link => {
      link.addEventListener('click', function (event) {
          event.preventDefault();
  
          // Close the menu
          burgerMenu.classList.remove('U_Open');
          burgerMenuList.classList.remove('U_BurgerMenuListOpen');
  
          // Get the target section ID from the href
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
  
          // Check if the target element exists
          if (targetElement) {
              // Calculate the position of the target element with an offset
              const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 70;
  
              // Smoothly scroll to the calculated position
              window.scrollTo({
                  top: targetPosition,
                  behavior: 'smooth'
              });
          }
      });
  });
  let listOfCards = document.querySelector('#U_Cards');
  let currentPosition = 0;
  let swipeNumber = 0;
  listOfCards.style.left = currentPosition
  document.querySelector('.U_Left').addEventListener('click', function () {
      console.log('test')
      if (currentPosition < 0) {
          currentPosition += listOfCards.childNodes[1].offsetWidth + 2
          listOfCards.style.left = `${currentPosition}px`
          console.log('left', listOfCards.childNodes[1].offsetWidth, currentPosition)
      } else {
          console.log('Нельзя')
      }
  });
      document.querySelector('.U_Right').addEventListener('click', function () {
          const divs = Array.from(listOfCards.children).filter(el => el.tagName === 'DIV');
          console.log(divs)
          const elementToClone = divs[swipeNumber];
          const clone = elementToClone.cloneNode(true);
          listOfCards.appendChild(clone);
          swipeNumber += 1;
          currentPosition -= listOfCards.childNodes[1].offsetWidth + 2
          listOfCards.style.left = `${currentPosition}px`
          const DesktopCards = document.querySelectorAll('.U_DesktopCard');
          DesktopCards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
          e.target.children[0].classList.add('U_HoverAnimationOpen')
          e.target.children[0].children[1]
          e.target.children[0].children[1].classList.add('U_TextInCardOpacity')
          e.target.children[0].children[0].children[1].classList.add('A_PlusButtonHover')
      })
      card.addEventListener('mouseleave', (e) => {
          e.target.children[0].classList.remove('U_HoverAnimationOpen')
          e.target.children[0].children[1]
          e.target.children[0].children[1].classList.remove('U_TextInCardOpacity')
          e.target.children[0].children[0].children[1].classList.remove('A_PlusButtonHover')
  
      })
  });
      })
  // document.querySelector('.U_Right').addEventListener('click', function () {
  //     console.log(currentPosition, -listOfCards.offsetWidth)
  //     // if (currentPosition > (-listOfCards.offsetWidth + (listOfCards.childNodes[1].offsetWidth * 3) + (2 * 3))){
  //     if (currentPosition > -(listOfCards.offsetWidth + listOfCards.childNodes[1].offsetWidth)) {
  //         currentPosition -= listOfCards.childNodes[1].offsetWidth + 2
  //         listOfCards.style.left = `${currentPosition}px`
  //         console.log('left', listOfCards.childNodes[1].offsetWidth, currentPosition)
  //     } else {
  //         console.log('Нельзя')
  //     }
  // });
  const DesktopCards = document.querySelectorAll('.U_DesktopCard');
  DesktopCards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
          e.target.children[0].classList.add('U_HoverAnimationOpen')
          e.target.children[0].children[1]
          e.target.children[0].children[1].classList.add('U_TextInCardOpacity')
          e.target.children[0].children[0].children[1].classList.add('A_PlusButtonHover')
      })
      card.addEventListener('mouseleave', (e) => {
          e.target.children[0].classList.remove('U_HoverAnimationOpen')
          e.target.children[0].children[1]
          e.target.children[0].children[1].classList.remove('U_TextInCardOpacity')
          e.target.children[0].children[0].children[1].classList.remove('A_PlusButtonHover')
  
      })
  });
  const rows = document.querySelectorAll('.W_MainTable .A_TableRow');
  const showMoreButton = document.querySelector('.W_TableButton .A_Button');
  let visibleRows = 10; // Number of rows to show initially
  // Function to update row visibility
  function updateVisibility() {
      rows.forEach((row, index) => {
          if (index < visibleRows) {
              row.style.display = 'flex'; // Show the row
          } else {
              row.style.display = 'none'; // Hide the row
          }
      });
  
      // Hide the button if all rows are visible
      if (visibleRows >= rows.length) {
          showMoreButton.style.display = 'none';
      }
  }
  
  // Initial call to set the initial visibility
  updateVisibility();
  // Mobile Cards swipe and arrows
  const cardContainer = document.getElementById('U_CardsMobile');
  const activeCounterElement = document.querySelector('.U_Active');
  const cardWidth = cardContainer.children[0].offsetWidth;
  let activeIndex = 0;
  let startX = 0;
  
  // Function to update card position and counter display
  function updateCardDisplay() {
      const translateValue = -activeIndex * (cardWidth + 2); // Adjust for gap
      cardContainer.style.left = `${translateValue}px`;
      activeCounterElement.textContent = activeIndex + 1; // Displaying count starting from 1
  }
  
  // Left arrow click
  document.querySelector('.U_LeftMobile').addEventListener('click', () => {
      if (activeIndex > 0) {
          activeIndex--;
          updateCardDisplay();
      }
  });
  
  // Right arrow click
  document.querySelector('.U_RightMobile').addEventListener('click', () => {
      if (activeIndex < cardContainer.children.length - 1) {
          activeIndex++;
          updateCardDisplay();
      }
  });
  
  // Swipe start
  cardContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
  });
  
  // Swipe end
  cardContainer.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const difference = endX - startX;
      const threshold = 50; // Swipe threshold
  
      if (difference > threshold && activeIndex > 0) {
          // Swipe right
          activeIndex--;
      } else if (difference < -threshold && activeIndex < cardContainer.children.length - 1) {
          // Swipe left
          activeIndex++;
      }
      updateCardDisplay();
  });
  
  // Initial display update
  updateCardDisplay();
  
  // Event listener for "Show more" button
  showMoreButton.addEventListener('click', () => {
      visibleRows += 10; // Increase the number of visible rows by 10
      updateVisibility(); // Update visibility after increment
  });
})
document.addEventListener('DOMContentLoaded', () => {
  const offersContainer = document.querySelector('.W_Offers');
  const offers = document.querySelectorAll('.W_Offer');
  
  if (offers.length > 0) {
      const totalOffers = offers.length;
      let currentIndex = 0;
      
      const leftArrow = document.querySelector('.U_LeftOffer');
      const rightArrow = document.querySelector('.U_RightOffer');
      
      // Update the mobile counter
      const currentCountElement = document.querySelector('.A_Mobilecount.U_Dynamic');
      const totalCountElement = document.querySelector('.A_Mobilecount:last-child');
      
      // Function to get the width of a slide including gap
      const getSlideWidth = () => {
          const slide = offers[0];
          const slideWidth = slide.getBoundingClientRect().width;
          const containerStyles = window.getComputedStyle(offersContainer);
          const gapWidth = parseFloat(containerStyles.columnGap || containerStyles.gap || 0);
          return slideWidth + gapWidth;
      };
      
      const updateSliderPosition = () => {
          const slideWidth = getSlideWidth();
          const translateX = -(currentIndex * slideWidth);
          offersContainer.style.transform = `translateX(${translateX}px)`;
          currentCountElement.textContent = currentIndex + 1;
      };
      
      rightArrow.addEventListener('click', () => {
          if (currentIndex < totalOffers - 1) {
            currentIndex++;
            updateSliderPosition();
          }
      });
      
      leftArrow.addEventListener('click', () => {
          if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
          }
      });
      
      // Optional: Update slide width on window resize
      window.addEventListener('resize', updateSliderPosition);
  }
});

